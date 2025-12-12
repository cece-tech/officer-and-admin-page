import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private authToken = new BehaviorSubject<string | null>(localStorage.getItem('auth_token'));

  constructor(private http: HttpClient) {}

  // Auth Endpoints
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/profile`, data);
  }

  // Clearance Endpoints
  getClearances(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clearances`);
  }

  getClearance(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clearances/${id}`);
  }

  createClearance(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clearances`, data);
  }

  resubmitClearance(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/clearances/${id}/resubmit`, {});
  }

  approveClearance(approverId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/clearances/approvers/${approverId}/approve`, {});
  }

  rejectClearance(approverId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clearances/approvers/${approverId}/reject`, data);
  }

  getClearanceQueue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clearances/queue`);
  }

  downloadCertificate(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clearances/${id}/download-certificate`);
  }

  // Notification Endpoints
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }

  markNotificationAsRead(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/${id}/read`, {});
  }

  markAllNotificationsAsRead(): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/read-all`, {});
  }

  getUnreadCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications/unread-count`);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/${id}`);
  }

  // Report Endpoints
  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/statistics`);
  }

  getClearanceReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/clearances`);
  }

  exportCSV(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/export-csv`);
  }

  exportPDF(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/export-pdf`);
  }

  getAuditLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/audit-logs`);
  }

  // SSC Endpoints
  getSSCDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/dashboard`);
  }

  getCourseStudents(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/students`);
  }

  getCourseSummary(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/summary`);
  }

  getNonSubmitters(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/non-submitters`);
  }

  getPendingReview(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/pending-review`);
  }

  getRejectedClearances(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/rejected`);
  }

  getCompletedClearances(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/completed`);
  }

  getCourseDetailedReport(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ssc/course/${section}/report`);
  }

  sendReminders(section: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ssc/course/${section}/send-reminders`, {});
  }

  // Student Dashboard Endpoints
  getStudentOverview(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/overview`);
  }

  getMyClearance(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/clearances/${id}`);
  }

  getMyPendingApprovals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/pending-approvals`);
  }

  getMyCompletedClearances(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/completed-clearances`);
  }

  getMyRejectedClearances(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/rejected-clearances`);
  }

  getCourseClearanceRequirements(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/course/${section}/requirements`);
  }

  getMyNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/notifications`);
  }

  getClearanceTimeline(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-dashboard/clearances/${id}/timeline`);
  }

  // Token Management
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.authToken.next(token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  clearAuthToken(): void {
    localStorage.removeItem('auth_token');
    this.authToken.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
