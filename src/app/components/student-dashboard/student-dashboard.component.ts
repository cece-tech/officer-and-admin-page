import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule, ReactiveFormsModule]
})
export class StudentDashboardComponent implements OnInit {
  currentUser: any;
  activeTab = 'overview';

  // Clearance data
  clearances: any[] = [];
  overview: any = {};
  pendingApprovals: any[] = [];
  completedClearances: any[] = [];
  rejectedClearances: any[] = [];
  notifications: any[] = [];

  isLoading = false;
  showSubmitModal = false;
  submitForm!: FormGroup;

  sections = ['CS101', 'CS102', 'IT101', 'IT102', 'MATH101'];
  requestTypes = ['academic', 'financial'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.submitForm = this.formBuilder.group({
      section: ['', []],
      request_type: ['academic', []]
    });
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userStr);

    // Check if user is student
    if (this.currentUser.role !== 'STUDENT') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadStudentData();
  }

  loadStudentData() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load clearances
    this.http.get<any>('http://localhost:8000/api/clearances', { headers })
      .subscribe({
        next: (response) => {
          this.clearances = response.clearances || [];
          this.processClearances();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading clearances:', err);
          this.isLoading = false;
        }
      });

    // Load notifications
    this.http.get<any>('http://localhost:8000/api/notifications', { headers })
      .subscribe({
        next: (response) => {
          this.notifications = response.notifications || [];
        },
        error: (err) => {
          console.error('Error loading notifications:', err);
        }
      });
  }

  processClearances() {
    // Group clearances by status
    this.pendingApprovals = this.clearances.filter(c =>
      c.status === 'PENDING' || c.status === 'IN_PROGRESS'
    );
    this.completedClearances = this.clearances.filter(c =>
      c.status === 'COMPLETED'
    );
    this.rejectedClearances = this.clearances.filter(c =>
      c.status === 'REJECTED'
    );

    // Calculate overview stats
    this.overview = {
      total: this.clearances.length,
      pending: this.pendingApprovals.length,
      completed: this.completedClearances.length,
      rejected: this.rejectedClearances.length,
      completionRate: this.clearances.length > 0
        ? Math.round((this.completedClearances.length / this.clearances.length) * 100)
        : 0
    };
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  openSubmitModal() {
    this.showSubmitModal = true;
  }

  closeSubmitModal() {
    this.showSubmitModal = false;
    this.submitForm.reset({ request_type: 'academic' });
  }

  submitRequest() {
    if (this.submitForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      section: this.submitForm.get('section')?.value,
      request_type: this.submitForm.get('request_type')?.value
    };

    this.http.post<any>('http://localhost:8000/api/clearances', payload, { headers })
      .subscribe({
        next: (response) => {
          alert('Clearance request submitted successfully!');
          this.closeSubmitModal();
          this.loadStudentData();
        },
        error: (err) => {
          alert('Error submitting request: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  downloadCertificate(clearanceId: number) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`http://localhost:8000/api/clearances/${clearanceId}/pdf`,
      { headers, responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `clearance-certificate-${clearanceId}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          alert('Error downloading certificate: ' + (err.error?.message || 'Unknown error'));
        }
      });
  }

  resubmitRequest(clearanceId: number) {
    const comment = prompt('Enter your revisions/comments:');
    if (!comment) return;

    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      notes: comment,
      status: 'IN_PROGRESS'
    };

    this.http.put<any>(`http://localhost:8000/api/clearances/${clearanceId}`, payload, { headers })
      .subscribe({
        next: (response) => {
          alert('Request resubmitted successfully!');
          this.loadStudentData();
        },
        error: (err) => {
          alert('Error resubmitting: ' + (err.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  markNotificationAsRead(notificationId: number) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.post(`http://localhost:8000/api/notifications/${notificationId}/read`, {}, { headers })
      .subscribe({
        next: () => {
          this.notifications = this.notifications.map(n =>
            n.id === notificationId ? { ...n, read_at: new Date() } : n
          );
        },
        error: (err) => console.error('Error marking notification as read:', err)
      });
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
