import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-dashboard',
  templateUrl: './registrar-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule, ReactiveFormsModule]
})
export class RegistrarDashboardComponent implements OnInit {
  currentUser: any;
  activeTab = 'dashboard';

  // Dashboard stats
  stats = {
    totalStudents: 0,
    totalClearances: 0,
    pendingClearances: 0,
    completedClearances: 0,
    rejectedClearances: 0,
    completionRate: 0
  };

  // Data for various views
  recentClearances: any[] = [];
  allClearances: any[] = [];
  departmentStats: any[] = [];
  auditLogs: any[] = [];

  // Filters
  filterStatus = '';
  filterDepartment = '';
  filterDateRange = '';

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userStr);

    // Check if user is registrar or admin
    if (this.currentUser.role !== 'REGISTRAR' && this.currentUser.role !== 'ADMIN') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load dashboard statistics
    this.http.get<any>('http://localhost:8000/api/statistics', { headers })
      .subscribe({
        next: (response) => {
          this.stats = {
            totalStudents: response.total_students || 0,
            totalClearances: response.total_clearances || 0,
            pendingClearances: response.pending_clearances || 0,
            completedClearances: response.completed_clearances || 0,
            rejectedClearances: response.rejected_clearances || 0,
            completionRate: response.completion_rate || 0
          };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading statistics:', err);
          this.isLoading = false;
        }
      });

    // Load recent clearances
    this.http.get<any>('http://localhost:8000/api/clearances?limit=10', { headers })
      .subscribe({
        next: (response) => {
          this.recentClearances = response.clearances || [];
        },
        error: (err) => console.error('Error loading clearances:', err)
      });

    // Load department statistics
    this.http.get<any>('http://localhost:8000/api/reports/department-stats', { headers })
      .subscribe({
        next: (response) => {
          this.departmentStats = response.departments || [];
        },
        error: (err) => console.error('Error loading department stats:', err)
      });

    // Load audit logs
    this.http.get<any>('http://localhost:8000/api/audit-logs?limit=20', { headers })
      .subscribe({
        next: (response) => {
          this.auditLogs = response.logs || [];
        },
        error: (err) => console.error('Error loading audit logs:', err)
      });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  loadAllClearances() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    let url = 'http://localhost:8000/api/clearances';
    if (this.filterStatus) url += `?status=${this.filterStatus}`;

    this.http.get<any>(url, { headers })
      .subscribe({
        next: (response) => {
          this.allClearances = response.clearances || [];
        },
        error: (err) => console.error('Error loading clearances:', err)
      });
  }

  exportToCSV() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get('http://localhost:8000/api/reports/export/csv',
      { headers, responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `clearance-report-${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => alert('Error exporting CSV: ' + (err.error?.message || 'Unknown error'))
      });
  }

  exportToPDF() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get('http://localhost:8000/api/reports/export/pdf',
      { headers, responseType: 'blob' })
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `clearance-report-${new Date().toISOString().split('T')[0]}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => alert('Error exporting PDF: ' + (err.error?.message || 'Unknown error'))
      });
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
