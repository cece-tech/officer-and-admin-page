import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-officer-dashboard',
  templateUrl: './officer-dashboard.component.html',
  styleUrls: ['./officer-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule, ReactiveFormsModule]
})
export class OfficerDashboardComponent implements OnInit {
  currentUser: any;
  activeTab = 'queue';

  // Queue data
  pendingQueue: any[] = [];
  completedApprovals: any[] = [];
  rejectedItems: any[] = [];

  // Stats
  stats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  };

  // Approval form
  selectedClearance: any = null;
  approvalForm!: FormGroup;
  showApprovalModal = false;

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.approvalForm = this.formBuilder.group({
      status: ['APPROVED', []],
      comments: ['', []]
    });
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userStr);

    // Check if user is officer or admin
    if (this.currentUser.role !== 'OFFICER' && this.currentUser.role !== 'ADMIN') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadOfficerQueue();
  }

  loadOfficerQueue() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load pending approvals queue
    this.http.get<any>('http://localhost:8000/api/queue', { headers })
      .subscribe({
        next: (response) => {
          this.pendingQueue = response.queue || [];
          this.completedApprovals = response.completed || [];
          this.rejectedItems = response.rejected || [];
          this.calculateStats();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading queue:', err);
          this.isLoading = false;
        }
      });
  }

  calculateStats() {
    this.stats.pending = this.pendingQueue.length;
    this.stats.approved = this.completedApprovals.length;
    this.stats.rejected = this.rejectedItems.length;
    this.stats.total = this.stats.pending + this.stats.approved + this.stats.rejected;
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  openApprovalModal(clearance: any) {
    this.selectedClearance = clearance;
    this.showApprovalModal = true;
    this.approvalForm.reset({ status: 'APPROVED', comments: '' });
  }

  closeApprovalModal() {
    this.showApprovalModal = false;
    this.selectedClearance = null;
    this.approvalForm.reset();
  }

  submitApproval() {
    if (!this.selectedClearance) return;

    const status = this.approvalForm.get('status')?.value;
    const comments = this.approvalForm.get('comments')?.value;

    if (status === 'REJECTED' && !comments) {
      alert('Please provide comments when rejecting');
      return;
    }

    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const endpoint = status === 'APPROVED'
      ? `/api/clearances/${this.selectedClearance.id}/approve`
      : `/api/clearances/${this.selectedClearance.id}/reject`;

    const payload = {
      comments: comments,
      approver_id: this.currentUser.id
    };

    this.http.post<any>(`http://localhost:8000${endpoint}`, payload, { headers })
      .subscribe({
        next: (response) => {
          alert(`Clearance ${status.toLowerCase()} successfully!`);
          this.closeApprovalModal();
          this.loadOfficerQueue();
        },
        error: (err) => {
          alert('Error processing approval: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  viewDetails(clearance: any) {
    // Navigate to clearance detail page
    this.router.navigate(['/officer/clearance', clearance.id]);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'PENDING':
      case 'IN_PROGRESS':
        return '#ff9800';
      case 'APPROVED':
      case 'COMPLETED':
        return '#4caf50';
      case 'REJECTED':
        return '#f44336';
      default:
        return '#999';
    }
  }
}
