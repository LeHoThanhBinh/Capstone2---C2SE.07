import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SubjectStat {
  name: string;
  color: string;
  percentage: number;
}

interface RecentRegistration {
  name: string;
  email: string;
  avatarColor: string;
  timeAgo: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  today = new Date();

  stats = {
    totalUsers: 1248,
    newUsersThisWeek: 24,
    onlineUsers: 37,
    questionsToday: 312,
    questionsTrend: 18,
    quizzesToday: 89,
    quizzesTrend: 5,
  };

  subjectStats: SubjectStat[] = [
    { name: 'Toán',           color: '#1565c0', percentage: 82 },
    { name: 'Vật Lý',         color: '#0288d1', percentage: 65 },
    { name: 'Hóa Học',        color: '#00897b', percentage: 58 },
    { name: 'Lịch Sử',        color: '#f57c00', percentage: 44 },
    { name: 'Địa Lý',         color: '#7b1fa2', percentage: 39 },
    { name: 'KT & Pháp Luật', color: '#c62828', percentage: 28 },
  ];

  recentRegistrations: RecentRegistration[] = [
    { name: 'Nguyễn Thị Mai',  email: 'mai.nguyen@gmail.com',  avatarColor: '#1565c0', timeAgo: '5 phút trước'  },
    { name: 'Trần Văn Hùng',   email: 'hung.tran@gmail.com',   avatarColor: '#00897b', timeAgo: '12 phút trước' },
    { name: 'Lê Thị Phương',   email: 'phuong.le@gmail.com',   avatarColor: '#f57c00', timeAgo: '28 phút trước' },
    { name: 'Phạm Quốc Bảo',   email: 'bao.pham@gmail.com',    avatarColor: '#7b1fa2', timeAgo: '1 giờ trước'   },
    { name: 'Hoàng Minh Tuấn', email: 'tuan.hoang@gmail.com',  avatarColor: '#c62828', timeAgo: '2 giờ trước'   },
  ];

  ngOnInit(): void {
    // TODO: Gọi API thực tế từ backend Django
    // this.dashboardService.getStats().subscribe(data => this.stats = data);
    // this.dashboardService.getSubjectStats().subscribe(data => this.subjectStats = data);
    // this.dashboardService.getRecentRegistrations().subscribe(data => this.recentRegistrations = data);
  }
}