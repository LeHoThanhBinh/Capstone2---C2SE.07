import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  avatarColor: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[] = [
    { id: 1,  name: 'Nguyễn Văn An',    email: 'an.nguyen@gmail.com',    avatarColor: '#1565c0' },
    { id: 2,  name: 'Trần Thị Bình',    email: 'binh.tran@gmail.com',    avatarColor: '#00897b' },
    { id: 3,  name: 'Lê Hoàng Nam',     email: 'nam.le@gmail.com',       avatarColor: '#f57c00' },
    { id: 4,  name: 'Phạm Minh Châu',   email: 'chau.pham@gmail.com',    avatarColor: '#7b1fa2' },
    { id: 5,  name: 'Võ Thị Diễm',      email: 'diem.vo@gmail.com',      avatarColor: '#c62828' },
    { id: 6,  name: 'Nguyễn Thị Lan',   email: 'lan.nguyen@gmail.com',   avatarColor: '#0288d1' },
    { id: 7,  name: 'Trần Quốc Bảo',    email: 'bao.tran@gmail.com',     avatarColor: '#00897b' },
    { id: 8,  name: 'Lê Thị Hương',     email: 'huong.le@gmail.com',     avatarColor: '#f57c00' },
  ];

  filteredUsers: User[] = [];
  searchQuery = '';

  showModal = false;
  showDeleteModal = false;
  isEditing = false;
  selectedUser: User | null = null;

  form = { name: '', email: '', password: '' };

  private readonly colors = ['#1565c0','#00897b','#f57c00','#7b1fa2','#c62828','#0288d1'];

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
    // TODO: this.userService.getAll().subscribe(data => { this.users = data; this.filteredUsers = data; });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredUsers = q
      ? this.users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      : [...this.users];
  }

  openAdd(): void {
    this.isEditing = false;
    this.form = { name: '', email: '', password: '' };
    this.showModal = true;
  }

  openEdit(user: User): void {
    this.isEditing = true;
    this.selectedUser = user;
    this.form = { name: user.name, email: user.email, password: '' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  saveUser(): void {
    if (!this.form.name.trim() || !this.form.email.trim()) return;

    if (this.isEditing && this.selectedUser) {
      const idx = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (idx !== -1) {
        this.users[idx] = { ...this.users[idx], name: this.form.name, email: this.form.email };
      }
    } else {
      this.users.unshift({
        id: Date.now(),
        name: this.form.name,
        email: this.form.email,
        avatarColor: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }

    this.applyFilter();
    this.closeModal();
  }

  confirmDelete(user: User): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  deleteUser(): void {
    if (this.selectedUser) {
      this.users = this.users.filter(u => u.id !== this.selectedUser!.id);
      this.applyFilter();
    }
    this.showDeleteModal = false;
    this.selectedUser = null;
  }
}