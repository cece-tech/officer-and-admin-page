import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clearance-detail',
  templateUrl: './clearance-detail.component.html',
  styleUrls: ['./clearance-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule, ReactiveFormsModule]
})
export class ClearanceDetailComponent implements OnInit {
  clearanceId: number = 0;
  clearance: any = null;
  currentUser: any;
  activeTab = 'overview';

  approvers: any[] = [];
  documents: any[] = [];
  timeline: any[] = [];

  approvalForm!: FormGroup;
  showApprovalModal = false;

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.clearanceId = parseInt(params['id'], 10);
      this.loadClearanceDetails();
    });
  }

  loadClearanceDetails() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>(`http://localhost:8000/api/clearances/${this.clearanceId}`, { headers })
      .subscribe({
        next: (response) => {
          this.clearance = response.clearance || {};
          this.approvers = response.approvers || [];
          this.documents = response.documents || [];
          this.timeline = response.timeline || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading clearance:', err);
          this.isLoading = false;
          alert('Error loading clearance details');
          this.router.navigate(['/officer']);
        }
      });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  openApprovalModal() {
    this.showApprovalModal = true;
    this.approvalForm.reset({ status: 'APPROVED', comments: '' });
  }

  closeApprovalModal() {
    this.showApprovalModal = false;
    this.approvalForm.reset();
  }

  submitApproval() {
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
      ? `/api/clearances/${this.clearanceId}/approve`
      : `/api/clearances/${this.clearanceId}/reject`;

    const payload = {
      comments: comments,
      approver_id: this.currentUser.id
    };

    this.http.post<any>(`http://localhost:8000${endpoint}`, payload, { headers })
      .subscribe({
        next: (response) => {
          alert(`Clearance ${status.toLowerCase()} successfully!`);
          this.closeApprovalModal();
          this.loadClearanceDetails();
        },
        error: (err) => {
          alert('Error processing approval: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  downloadDocument(docId: number, docName: string) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`http://localhost:8000/api/documents/${docId}/download`,
      { headers, responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = docName;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => alert('Error downloading document')
      });
  }

  goBack() {
    this.router.navigate(['/officer']);
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

  getTimelineIcon(action: string): string {
    switch(action.toUpperCase()) {
      case 'CREATED':
        return '📋';
      case 'APPROVED':
        return '✓';
      case 'REJECTED':
        return '✗';
      case 'RESUBMITTED':
        return '🔄';
      case 'COMPLETED':
        return '🎉';
      default:
        return '📌';
    }
  }
}
