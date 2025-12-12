import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ssc-dashboard',
  templateUrl: './ssc-dashboard.component.html',
  styleUrls: ['./ssc-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe]
})
export class SSCDashboardComponent implements OnInit {
  currentUser: any;
  sections = ['CS101', 'CS102', 'IT101', 'IT102'];
  activeSection = 'CS101';
  viewMode = 'summary';

  courseSummary: any;
  courseStudents: any;
  pendingReview: any;
  nonSubmitters: any;
  completedList: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user || !['OFFICER', 'REGISTRAR', 'ADMIN'].includes(user.role)) {
        this.router.navigate(['/login']);
      }
    });

    this.loadCourseSummary();
  }

  selectSection(section: string): void {
    this.activeSection = section;
    this.viewMode = 'summary';
    this.loadCourseSummary();
  }

  loadCourseSummary(): void {
    this.apiService.getCourseSummary(this.activeSection).subscribe({
      next: (data) => {
        this.courseSummary = data;
      },
      error: (error) => {
        console.error('Error loading summary:', error);
      }
    });
  }

  loadCourseStudents(): void {
    this.viewMode = 'students';
    this.apiService.getCourseStudents(this.activeSection).subscribe({
      next: (data) => {
        this.courseStudents = data;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  loadPendingReview(): void {
    this.viewMode = 'pending';
    this.apiService.getPendingReview(this.activeSection).subscribe({
      next: (data) => {
        this.pendingReview = data;
      },
      error: (error) => {
        console.error('Error loading pending review:', error);
      }
    });
  }

  loadNonSubmitters(): void {
    this.viewMode = 'non-submitters';
    this.apiService.getNonSubmitters(this.activeSection).subscribe({
      next: (data) => {
        this.nonSubmitters = data;
      },
      error: (error) => {
        console.error('Error loading non-submitters:', error);
      }
    });
  }

  loadCompletedList(): void {
    this.viewMode = 'completed';
    this.apiService.getCompletedClearances(this.activeSection).subscribe({
      next: (data) => {
        this.completedList = data;
      },
      error: (error) => {
        console.error('Error loading completed:', error);
      }
    });
  }

  approveItem(approverId: number): void {
    if (confirm('Approve this clearance item?')) {
      this.apiService.approveClearance(approverId).subscribe({
        next: () => {
          alert('Item approved successfully');
          this.loadPendingReview();
        },
        error: (error) => {
          alert('Error approving: ' + error.error.message);
        }
      });
    }
  }

  openRejectModal(approverId: number): void {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      this.apiService.rejectClearance(approverId, { comments: reason }).subscribe({
        next: () => {
          alert('Item rejected successfully');
          this.loadPendingReview();
        },
        error: (error) => {
          alert('Error rejecting: ' + error.error.message);
        }
      });
    }
  }

  viewStudentClearance(id: number): void {
    console.log('Viewing clearance:', id);
  }

  sendRemindersConfirm(): void {
    if (confirm(`Send reminders to non-submitters in ${this.activeSection}?`)) {
      this.apiService.sendReminders(this.activeSection).subscribe({
        next: () => {
          alert('Reminders sent successfully');
        },
        error: (error) => {
          alert('Error sending reminders: ' + error.error.message);
        }
      });
    }
  }

  sendReminderSingle(studentId: number): void {
    // Implement single reminder send if needed
    alert('Reminder sent to student ' + studentId);
  }

  downloadReport(): void {
    this.apiService.getCourseDetailedReport(this.activeSection).subscribe({
      next: (data) => {
        // Generate CSV and download
        const csv = this.convertToCSV(data);
        this.downloadCSVFile(csv, `report-${this.activeSection}.csv`);
      },
      error: (error) => {
        alert('Error downloading report: ' + error.error.message);
      }
    });
  }

  convertToCSV(data: any): string {
    let csv = 'Student ID,Name,Email,Status\n';
    if (data.clearances) {
      data.clearances.forEach((clearance: any) => {
        csv += `${clearance.student_id},${clearance.student_name},${clearance.email},${clearance.status}\n`;
      });
    }
    return csv;
  }

  downloadCSVFile(csv: string, filename: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
