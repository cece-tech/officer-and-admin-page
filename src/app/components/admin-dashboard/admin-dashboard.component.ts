import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule, ReactiveFormsModule]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any;
  activeTab = 'dashboard';

  // System stats
  systemStats = {
    totalUsers: 0,
    totalStudents: 0,
    totalOfficers: 0,
    totalRegistrars: 0,
    totalClearances: 0,
    systemHealth: 'Good'
  };

  // User management
  allUsers: any[] = [];
  showUserForm = false;
  userForm!: FormGroup;
  editingUser: any = null;

  // System configuration
  clearanceRequirements: any[] = [];
  showRequirementForm = false;
  requirementForm!: FormGroup;

  // Audit and monitoring
  systemLogs: any[] = [];
  errorLogs: any[] = [];

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', []],
      email: ['', []],
      role: ['STUDENT', []],
      department_id: ['', []]
    });

    this.requirementForm = this.formBuilder.group({
      name: ['', []],
      section: ['', []],
      department_id: ['', []]
    });
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userStr);

    // Check if user is admin
    if (this.currentUser.role !== 'ADMIN') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadAdminData();
  }

  loadAdminData() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load system statistics
    this.http.get<any>('http://localhost:8000/api/admin/stats', { headers })
      .subscribe({
        next: (response) => {
          this.systemStats = response.stats || this.systemStats;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading stats:', err);
          this.isLoading = false;
        }
      });

    // Load all users
    this.http.get<any>('http://localhost:8000/api/admin/users', { headers })
      .subscribe({
        next: (response) => {
          this.allUsers = response.users || [];
        },
        error: (err) => console.error('Error loading users:', err)
      });

    // Load clearance requirements
    this.http.get<any>('http://localhost:8000/api/admin/requirements', { headers })
      .subscribe({
        next: (response) => {
          this.clearanceRequirements = response.requirements || [];
        },
        error: (err) => console.error('Error loading requirements:', err)
      });

    // Load system logs
    this.http.get<any>('http://localhost:8000/api/admin/logs?limit=50', { headers })
      .subscribe({
        next: (response) => {
          this.systemLogs = response.logs || [];
        },
        error: (err) => console.error('Error loading logs:', err)
      });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  // User Management Methods
  openUserForm(user?: any) {
    this.editingUser = user;
    if (user) {
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset({ role: 'STUDENT' });
    }
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
    this.userForm.reset();
    this.editingUser = null;
  }

  saveUser() {
    if (this.userForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const formData = this.userForm.value;

    let request;
    if (this.editingUser) {
      request = this.http.put(`http://localhost:8000/api/admin/users/${this.editingUser.id}`,
        formData, { headers });
    } else {
      request = this.http.post('http://localhost:8000/api/admin/users',
        formData, { headers });
    }

    request.subscribe({
      next: (response) => {
        alert('User saved successfully!');
        this.closeUserForm();
        this.loadAdminData();
      },
      error: (err) => {
        alert('Error saving user: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  deleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete(`http://localhost:8000/api/admin/users/${userId}`, { headers })
      .subscribe({
        next: (response) => {
          alert('User deleted successfully!');
          this.loadAdminData();
        },
        error: (err) => {
          alert('Error deleting user: ' + (err.error?.message || 'Unknown error'));
        }
      });
  }

  // Clearance Requirement Methods
  openRequirementForm(requirement?: any) {
    if (requirement) {
      this.requirementForm.patchValue(requirement);
    } else {
      this.requirementForm.reset();
    }
    this.showRequirementForm = true;
  }

  closeRequirementForm() {
    this.showRequirementForm = false;
    this.requirementForm.reset();
  }

  saveRequirement() {
    if (this.requirementForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const formData = this.requirementForm.value;

    this.http.post('http://localhost:8000/api/admin/requirements',
      formData, { headers })
      .subscribe({
        next: (response) => {
          alert('Requirement created successfully!');
          this.closeRequirementForm();
          this.loadAdminData();
        },
        error: (err) => {
          alert('Error saving requirement: ' + (err.error?.message || 'Unknown error'));
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
