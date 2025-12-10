// Officer Dashboard JavaScript

// Sample Queue Data
const queueData = [
    {
        id: 'STU-001',
        studentId: '2301436',
        name: 'Carol Egonio',
        email: 'carol.egonio@student.lnu.edu.ph',
        program: 'BSIT',
        year: '3',
        submittedDate: '2025-12-09',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'STU-002',
        studentId: '2301536',
        name: 'Maria Santos',
        email: 'maria.santos@student.lnu.edu.ph',
        program: 'BSIT',
        year: '2',
        submittedDate: '2025-12-09',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 'STU-003',
        studentId: '2301636',
        name: 'John Doe',
        email: 'john.doe@student.lnu.edu.ph',
        program: 'BSCS',
        year: '4',
        submittedDate: '2025-12-08',
        priority: 'low',
        status: 'pending'
    },
    {
        id: 'STU-004',
        studentId: '2021-00123',
        name: 'Sofia Reyes',
        email: 'sofia.reyes@student.lnu.edu.ph',
        program: 'BSCE',
        year: '1',
        submittedDate: '2025-12-08',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'STU-005',
        studentId: '2021-00456',
        name: 'Juan Dela Cruz',
        email: 'juan.delacruz@student.lnu.edu.ph',
        program: 'BSIT',
        year: '3',
        submittedDate: '2025-12-07',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 'STU-006',
        studentId: '2024-00456',
        name: 'Anna Garcia',
        email: 'anna.garcia@student.lnu.edu.ph',
        program: 'BSCS',
        year: '2',
        submittedDate: '2025-12-07',
        priority: 'low',
        status: 'pending'
    },
    {
        id: 'STU-007',
        studentId: '2024-00789',
        name: 'David Lopez',
        email: 'david.lopez@student.lnu.edu.ph',
        program: 'BSCE',
        year: '3',
        submittedDate: '2025-12-06',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'STU-008',
        studentId: '2024-00999',
        name: 'Elena Diaz',
        email: 'elena.diaz@student.lnu.edu.ph',
        program: 'BSIT',
        year: '1',
        submittedDate: '2025-12-06',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 'STU-009',
        studentId: '2024-01234',
        name: 'Miguel Rodriguez',
        email: 'miguel.rodriguez@student.lnu.edu.ph',
        program: 'BSCS',
        year: '4',
        submittedDate: '2025-12-05',
        priority: 'low',
        status: 'pending'
    },
    {
        id: 'STU-010',
        studentId: '2024-01567',
        name: 'Isabel Martinez',
        email: 'isabel.martinez@student.lnu.edu.ph',
        program: 'BSCE',
        year: '2',
        submittedDate: '2025-12-05',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'STU-011',
        studentId: '2024-01890',
        name: 'Carlos Mendez',
        email: 'carlos.mendez@student.lnu.edu.ph',
        program: 'BSIT',
        year: '3',
        submittedDate: '2025-12-04',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 'STU-012',
        studentId: '2024-02123',
        name: 'Rosa Santos',
        email: 'rosa.santos@student.lnu.edu.ph',
        program: 'BSCS',
        year: '1',
        submittedDate: '2025-12-04',
        priority: 'low',
        status: 'pending'
    }
];

// Follow-up Data
const followupData = [
    {
        id: 'FU-001',
        studentId: '2024-00111',
        name: 'Tom Wilson',
        reason: 'Submit Library Clearance',
        status: 'pending',
        priority: 'urgent',
        dueDate: '2025-12-10'
    },
    {
        id: 'FU-002',
        studentId: '2024-00222',
        name: 'Sarah Johnson',
        reason: 'Pay Outstanding Fees',
        status: 'contacted',
        priority: 'high',
        dueDate: '2025-12-12'
    },
    {
        id: 'FU-003',
        studentId: '2024-00333',
        name: 'Mike Anderson',
        reason: 'Submit Medical Clearance',
        status: 'resolved',
        priority: 'medium',
        dueDate: '2025-12-08'
    },
    {
        id: 'FU-004',
        studentId: '2024-00444',
        name: 'Lisa Brown',
        reason: 'Complete Lab Assessment',
        status: 'pending',
        priority: 'urgent',
        dueDate: '2025-12-11'
    },
    {
        id: 'FU-005',
        studentId: '2024-00555',
        name: 'Chris Lee',
        reason: 'Provide Clearance Letter',
        status: 'contacted',
        priority: 'high',
        dueDate: '2025-12-13'
    },
    {
        id: 'FU-006',
        studentId: '2024-00666',
        name: 'Jennifer White',
        reason: 'Verify Identity Documents',
        status: 'pending',
        priority: 'medium',
        dueDate: '2025-12-14'
    },
    {
        id: 'FU-007',
        studentId: '2024-00777',
        name: 'Robert Taylor',
        reason: 'Attend Orientation',
        status: 'resolved',
        priority: 'low',
        dueDate: '2025-12-09'
    }
];

// Approved Items Data
const approvedData = [
    { studentId: '2024-00001', name: 'Student Name 1', program: 'BSIT', date: '2025-12-09', notes: 'All requirements met' },
    { studentId: '2024-00002', name: 'Student Name 2', program: 'BSCS', date: '2025-12-09', notes: 'Library clearance verified' },
    { studentId: '2024-00003', name: 'Student Name 3', program: 'BSCE', date: '2025-12-08', notes: 'Finance clearance received' },
    { studentId: '2024-00004', name: 'Student Name 4', program: 'BSIT', date: '2025-12-08', notes: 'All documents approved' },
];

// Page Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        switchPage(page + '-page');
        updateActiveNav(this);
    });
});

document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const action = this.getAttribute('data-action');
        const pageMap = {
            'pending-queue': 'clearance-queue-page',
            'bulk-actions': 'bulk-actions-page',
            'follow-ups': 'follow-ups-page',
            'approved-items': 'approved-items-page',
            'rejected-items': 'rejected-items-page',
            'performance-report': 'performance-report-page',
            'profile-settings': 'profile-settings-page'
        };
        
        if (pageMap[action]) {
            switchPage(pageMap[action]);
        }
    });
});

function switchPage(pageId) {
    document.querySelectorAll('.page-view').forEach(page => {
        page.classList.remove('active');
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        
        // Initialize queue on queue page
        if (pageId === 'clearance-queue-page') {
            renderQueue();
        }
        // Initialize follow-ups on follow-ups page
        if (pageId === 'follow-ups-page') {
            renderFollowups();
        }
        // Initialize approved list
        if (pageId === 'approved-items-page') {
            renderApprovedList();
        }
    }
}

function updateActiveNav(item) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
}

function goToPage(pageId) {
    switchPage(pageId);
}

// Render Queue Items
function renderQueue() {
    const container = document.getElementById('queueContainer');
    if (!container) return;
    
    container.innerHTML = queueData.map(item => `
        <div class="queue-item" data-id="${item.id}">
            <div class="queue-item-checkbox">
                <input type="checkbox" class="queue-select" value="${item.id}">
            </div>
            <div class="queue-item-info">
                <div class="queue-item-header">
                    <span class="queue-item-title">${item.name}</span>
                    <span class="queue-item-priority ${item.priority}">${item.priority.toUpperCase()}</span>
                </div>
                <div class="queue-item-meta">
                    <span>ID: ${item.studentId}</span>
                    <span>${item.program}</span>
                    <span>Year ${item.year}</span>
                    <span>Submitted: ${formatDate(item.submittedDate)}</span>
                </div>
            </div>
            <div class="queue-item-actions">
                <button class="btn-sm btn-approve" onclick="approveQueue('${item.id}')">✓ Approve</button>
                <button class="btn-sm btn-reject" onclick="rejectQueue('${item.id}')">✕ Reject</button>
                <button class="btn-sm btn-comment" onclick="openCommentModal('${item.id}', '${item.name}')">💬 Comment</button>
            </div>
        </div>
    `).join('');
}

// Render Follow-ups
function renderFollowups() {
    const container = document.getElementById('followupContainer');
    if (!container) return;
    
    container.innerHTML = followupData.map(item => `
        <div class="followup-card">
            <div class="followup-card-header">
                <span class="followup-card-title">${item.name}</span>
                <span class="followup-status ${item.status}">${item.status}</span>
            </div>
            <div class="followup-card-body">
                <p><strong>Student ID:</strong> ${item.studentId}</p>
                <p><strong>Due Date:</strong> ${formatDate(item.dueDate)}</p>
                <div class="followup-reason">⚠️ ${item.reason}</div>
            </div>
            <div class="followup-actions">
                <button class="btn-sm btn-comment" onclick="markContacted('${item.id}')">Mark Contacted</button>
                <button class="btn-sm btn-approve" onclick="resolveFollowup('${item.id}')">Resolve</button>
            </div>
        </div>
    `).join('');
}

// Render Approved List
function renderApprovedList() {
    const tbody = document.getElementById('approvedTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = approvedData.map(item => `
        <tr>
            <td>${item.studentId}</td>
            <td>${item.name}</td>
            <td>${item.program}</td>
            <td>${item.date}</td>
            <td>${item.notes}</td>
        </tr>
    `).join('');
}

// Filter Functions
function filterQueue() {
    const search = document.getElementById('queueSearch')?.value.toLowerCase() || '';
    const program = document.getElementById('queueProgramFilter')?.value || '';
    const year = document.getElementById('queueYearFilter')?.value || '';
    const priority = document.getElementById('queuePriorityFilter')?.value || '';
    
    const filtered = queueData.filter(item => {
        const searchMatch = 
            item.name.toLowerCase().includes(search) ||
            item.studentId.toLowerCase().includes(search) ||
            item.email.toLowerCase().includes(search);
        
        const programMatch = !program || item.program === program;
        const yearMatch = !year || item.year === year;
        const priorityMatch = !priority || item.priority === priority;
        
        return searchMatch && programMatch && yearMatch && priorityMatch;
    });
    
    updateQueueDisplay(filtered);
}

function updateQueueDisplay(filteredData) {
    const container = document.getElementById('queueContainer');
    if (!container) return;
    
    container.innerHTML = filteredData.map(item => `
        <div class="queue-item" data-id="${item.id}">
            <div class="queue-item-checkbox">
                <input type="checkbox" class="queue-select" value="${item.id}">
            </div>
            <div class="queue-item-info">
                <div class="queue-item-header">
                    <span class="queue-item-title">${item.name}</span>
                    <span class="queue-item-priority ${item.priority}">${item.priority.toUpperCase()}</span>
                </div>
                <div class="queue-item-meta">
                    <span>ID: ${item.studentId}</span>
                    <span>${item.program}</span>
                    <span>Year ${item.year}</span>
                    <span>Submitted: ${formatDate(item.submittedDate)}</span>
                </div>
            </div>
            <div class="queue-item-actions">
                <button class="btn-sm btn-approve" onclick="approveQueue('${item.id}')">✓ Approve</button>
                <button class="btn-sm btn-reject" onclick="rejectQueue('${item.id}')">✕ Reject</button>
                <button class="btn-sm btn-comment" onclick="openCommentModal('${item.id}', '${item.name}')">💬 Comment</button>
            </div>
        </div>
    `).join('');
}

function filterFollowups() {
    const search = document.getElementById('followupSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('followupStatusFilter')?.value || '';
    const priority = document.getElementById('followupPriorityFilter')?.value || '';
    
    const filtered = followupData.filter(item => {
        const searchMatch = 
            item.name.toLowerCase().includes(search) ||
            item.studentId.toLowerCase().includes(search);
        
        const statusMatch = !status || item.status === status;
        const priorityMatch = !priority || item.priority === priority;
        
        return searchMatch && statusMatch && priorityMatch;
    });
    
    updateFollowupDisplay(filtered);
}

function updateFollowupDisplay(filteredData) {
    const container = document.getElementById('followupContainer');
    if (!container) return;
    
    container.innerHTML = filteredData.map(item => `
        <div class="followup-card">
            <div class="followup-card-header">
                <span class="followup-card-title">${item.name}</span>
                <span class="followup-status ${item.status}">${item.status}</span>
            </div>
            <div class="followup-card-body">
                <p><strong>Student ID:</strong> ${item.studentId}</p>
                <p><strong>Due Date:</strong> ${formatDate(item.dueDate)}</p>
                <div class="followup-reason">⚠️ ${item.reason}</div>
            </div>
            <div class="followup-actions">
                <button class="btn-sm btn-comment" onclick="markContacted('${item.id}')">Mark Contacted</button>
                <button class="btn-sm btn-approve" onclick="resolveFollowup('${item.id}')">Resolve</button>
            </div>
        </div>
    `).join('');
}

function filterApproved() {
    const search = document.getElementById('approvedSearch')?.value.toLowerCase() || '';
    
    const filtered = approvedData.filter(item => {
        return item.studentId.toLowerCase().includes(search) ||
               item.name.toLowerCase().includes(search) ||
               item.program.toLowerCase().includes(search);
    });
    
    const tbody = document.getElementById('approvedTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td>${item.studentId}</td>
            <td>${item.name}</td>
            <td>${item.program}</td>
            <td>${item.date}</td>
            <td>${item.notes}</td>
        </tr>
    `).join('');
}

function resetFilters() {
    document.getElementById('queueSearch').value = '';
    document.getElementById('queueProgramFilter').value = '';
    document.getElementById('queueYearFilter').value = '';
    document.getElementById('queuePriorityFilter').value = '';
    document.getElementById('queueDateFilter').value = '';
    filterQueue();
}

// Queue Actions
function approveQueue(id) {
    const item = queueData.find(q => q.id === id);
    if (item) {
        alert(`✓ Approved: ${item.name}`);
        item.status = 'approved';
        renderQueue();
    }
}

function rejectQueue(id) {
    const item = queueData.find(q => q.id === id);
    if (item) {
        alert(`✕ Rejected: ${item.name}`);
        item.status = 'rejected';
        renderQueue();
    }
}

// Modal Functions
function openCommentModal(id, studentName) {
    const modal = document.getElementById('commentModal');
    document.getElementById('commentStudentName').value = studentName;
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Comment Form Handler
document.getElementById('commentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const comment = document.getElementById('commentText').value;
    const studentName = document.getElementById('commentStudentName').value;
    alert(`✓ Comment added for ${studentName}`);
    this.reset();
    closeModal('commentModal');
});

// Bulk Selection
let selectedItems = new Set();

function toggleBulkSelect() {
    const checkboxes = document.querySelectorAll('.queue-select');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
        updateSelectedItems();
    });
}

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('queue-select')) {
        updateSelectedItems();
    }
});

function updateSelectedItems() {
    selectedItems.clear();
    document.querySelectorAll('.queue-select:checked').forEach(cb => {
        selectedItems.add(cb.value);
    });
    
    document.getElementById('selectedCount').textContent = selectedItems.size;
    
    const selectedList = document.getElementById('selectedList');
    if (selectedList) {
        selectedList.innerHTML = Array.from(selectedItems).map(id => {
            const item = queueData.find(q => q.id === id);
            return `
                <div class="selected-item">
                    <span>${item ? item.name : id}</span>
                    <button class="selected-item-remove" onclick="removeSelected('${id}')">✕</button>
                </div>
            `;
        }).join('');
    }
}

function removeSelected(id) {
    selectedItems.delete(id);
    document.querySelector(`input[value="${id}"]`).checked = false;
    updateSelectedItems();
}

function clearSelection() {
    selectedItems.clear();
    document.querySelectorAll('.queue-select').forEach(cb => cb.checked = false);
    updateSelectedItems();
}

// Bulk Action Handler
document.addEventListener('change', function(e) {
    if (e.target.name === 'bulkAction') {
        const commentGroup = document.getElementById('commentGroup');
        if (e.target.value === 'comment') {
            commentGroup.style.display = 'block';
        } else {
            commentGroup.style.display = 'none';
        }
    }
});

function executeBulkAction() {
    if (selectedItems.size === 0) {
        alert('Please select items first');
        return;
    }
    
    const action = document.querySelector('input[name="bulkAction"]:checked')?.value;
    const comment = document.getElementById('bulkComment')?.value || '';
    const notes = document.getElementById('bulkNotes')?.value || '';
    
    if (!action) {
        alert('Please select an action');
        return;
    }
    
    const itemNames = Array.from(selectedItems)
        .map(id => queueData.find(q => q.id === id)?.name)
        .join(', ');
    
    alert(`✓ ${action.toUpperCase()} action executed on:\n${itemNames}`);
    clearSelection();
}

// Follow-up Actions
function markContacted(id) {
    const item = followupData.find(f => f.id === id);
    if (item && item.status !== 'resolved') {
        item.status = 'contacted';
        renderFollowups();
        alert(`✓ Marked as contacted: ${item.name}`);
    }
}

function resolveFollowup(id) {
    const item = followupData.find(f => f.id === id);
    if (item) {
        item.status = 'resolved';
        renderFollowups();
        alert(`✓ Follow-up resolved: ${item.name}`);
    }
}

// Export Functions
function exportApproved() {
    let csv = 'Student ID,Name,Program,Date,Notes\n';
    approvedData.forEach(item => {
        csv += `${item.studentId},"${item.name}",${item.program},${item.date},"${item.notes}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'approved-clearances.csv';
    a.click();
}

// Logout
function logoutOfficer() {
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out successfully.');
    }
}

// Initialize Charts
function initCharts() {
    // Approval Rate Chart
    const approvalCtx = document.getElementById('approvalChart');
    if (approvalCtx) {
        new Chart(approvalCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Approved',
                    data: [15, 18, 22, 16, 18],
                    backgroundColor: '#d4edda',
                    borderColor: '#28a745',
                    borderWidth: 1
                }, {
                    label: 'Rejected',
                    data: [2, 3, 1, 2, 3],
                    backgroundColor: '#f8d7da',
                    borderColor: '#dc3545',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Queue Overview Chart
    const queueCtx = document.getElementById('queueChart');
    if (queueCtx) {
        new Chart(queueCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Approved', 'Rejected', 'Follow-up'],
                datasets: [{
                    data: [12, 18, 3, 7],
                    backgroundColor: ['#fff3cd', '#d4edda', '#f8d7da', '#d1ecf1'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Modal Close on Click Outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    renderQueue();
});
