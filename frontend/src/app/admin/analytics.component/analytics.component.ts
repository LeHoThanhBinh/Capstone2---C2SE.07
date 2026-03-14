import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SubjectAnalytics {
  name: string;
  short: string;
  color: string;
  sessions: number;
  chatCount: number;
  quizCount: number;
  trend: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  subjectStats: SubjectAnalytics[] = [
    { name: 'Toán',                 short: 'T',   color: '#1565c0', sessions: 4820, chatCount: 3210, quizCount: 1610, trend: 12  },
    { name: 'Vật Lý',               short: 'VL',  color: '#0288d1', sessions: 3650, chatCount: 2400, quizCount: 1250, trend: 8   },
    { name: 'Hóa Học',              short: 'HH',  color: '#00897b', sessions: 3120, chatCount: 2050, quizCount: 1070, trend: -3  },
    { name: 'Lịch Sử',              short: 'LS',  color: '#f57c00', sessions: 2340, chatCount: 1680, quizCount: 660,  trend: 5   },
    { name: 'Địa Lý',               short: 'ĐL',  color: '#7b1fa2', sessions: 1980, chatCount: 1420, quizCount: 560,  trend: -1  },
    { name: 'KT & Pháp Luật',       short: 'KT',  color: '#c62828', sessions: 1450, chatCount: 1050, quizCount: 400,  trend: 15  },
  ];

  get totalSessions(): number {
    return this.subjectStats.reduce((sum, s) => sum + s.sessions, 0);
  }

  get maxSessions(): number {
    return Math.max(...this.subjectStats.map(s => s.sessions));
  }

  getPercent(sessions: number): string {
    return ((sessions / this.totalSessions) * 100).toFixed(1);
  }

  ngOnInit(): void {
    // TODO: Gọi API thực tế từ backend Django
    // this.analyticsService.getSubjectStats().subscribe(data => this.subjectStats = data);
  }
}