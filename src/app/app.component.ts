import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface MenuItem {
  title: string;
  iconClass: string;
  children: MenuItem[];
  expanded?: boolean;
  isActive: boolean;
  isHovered?: boolean;
  isClicked?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'visible',
        opacity: '1'
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ProjetStage';
  activeMenu: MenuItem | null = null;
  menuItems: MenuItem[] = [
    { title: 'Maileva', iconClass: 'fa-solid fa-paper-plane', children: [], isActive: false },
    { title: 'Tickets & Support', iconClass: 'fa-solid fa-ticket-alt', children: [], isActive: false },
    { title: 'Drive', iconClass: 'fa-solid fa-cloud', children: [], isActive: false },
    {
      title: 'Paramètres', iconClass: 'fa-solid fa-cogs', children: [
        {
          title: 'Admin', iconClass: 'fa-solid fa-cog', children: [
            {
              title: 'Commercial', iconClass: 'fa-solid fa-chart-line', children: [
                { title: 'Campagnes', iconClass: 'fa-solid fa-cubes', children: [], isActive: false },
                { title: 'Workflow Commercial', iconClass: 'fa-solid fa-stopwatch', children: [], isActive: false },
                { title: 'Statuts avant-vente', iconClass: 'fa-solid fa-lightbulb', children: [], isActive: false },
                { title: 'Services avant-vente', iconClass: 'fa-solid fa-toolbox', children: [], isActive: false },
              ], expanded: false, isActive: false
            },
            {
              title: 'Productions', iconClass: 'fa-solid fa-chart-pie', children: [
                { title: 'Service après-vente', iconClass: 'fa-solid fa-lightbulb', children: [], isActive: false },
                { title: 'Statuts après-vente', iconClass: 'fa-solid fa-toolbox', children: [], isActive: false },
                { title: 'Workflow Production', iconClass: 'fa-solid fa-braille', children: [], isActive: false },
              ], expanded: false, isActive: false
            },
            {
              title: 'Catalogues', iconClass: 'fa-solid fa-tags', children: [
                { title: 'Produits', iconClass: 'fa-solid fa-clipboard', children: [], isActive: false },
                { title: 'Compagnies', iconClass: 'fa-solid fa-laptop-house', children: [], isActive: false },
                { title: 'Gammes', iconClass: 'fa-solid fa-clone', children: [], isActive: false },
                { title: 'Lignes des Produits', iconClass: 'fa-solid fa-clipboard-list', children: [], isActive: false },
                { title: 'Catégories ticket', iconClass: 'fa-solid fa-tags', children: [], isActive: false },
                { title: 'Mots-clés', iconClass: 'fa-solid fa-hashtag', children: [], isActive: false },
                { title: 'Garanties', iconClass: 'fa-solid fa-th-large', children: [], isActive: false },
                { title: 'Groupes garanties', iconClass: 'fa-solid fa-file', children: [], isActive: false },
              ], expanded: false, isActive: false
            },
          ], expanded: false, isActive: false
        },
        {
          title: 'Utilisateurs', iconClass: 'fa-solid fa-users-cog', children: [
            { title: 'Roles', iconClass: 'fa-solid fa-sitemap', children: [], isActive: false },
            { title: 'Utilisateurs', iconClass: 'fa-solid fa-users', children: [], isActive: false },
            { title: 'Groupes', iconClass: 'fa-solid fa-object-group', children: [], isActive: false },
            { title: 'Menu', iconClass: 'fa-solid fa-align-justify', children: [], isActive: false },
            { title: 'Organismes', iconClass: 'fa-solid fa-building', children: [], isActive: false },
          ], expanded: false, isActive: false
        },
        { title: 'Parametre Globaux', iconClass: 'fa-solid fa-user-cog', children: [], isActive: false },
      ], expanded: false, isActive: false
    },
    { title: 'Webmail', iconClass: 'fa-solid fa-envelope', children: [], isActive: false },
    {
      title: 'Editique', iconClass: 'fa-solid fa-book-open', children: [
        { title: 'Courrier', iconClass: 'fa-solid fa-at', children: [], isActive: false },
        { title: 'SMS', iconClass: 'fa-solid fa-envelope', children: [], isActive: false },
        { title: 'Type Documents', iconClass: 'fa-solid fa-id-card', children: [], isActive: false },
      ], expanded: false, isActive: false
    },
    { title: 'Affaire', iconClass: 'fa-solid fa-file-contract', children: [], isActive: false },
    { title: 'Tâches', iconClass: 'fa-solid fa-tasks', children: [], isActive: false },
    { title: 'Prospects/Clients', iconClass: 'fa-solid fa-users', children: [], isActive: false },
    { title: 'Échéanciers', iconClass: 'fa-solid fa-money-check-alt', children: [], isActive: false },
    { title: 'Banque', iconClass: 'fa-solid fa-table', children: [], isActive: false },
    { title: 'Agenda', iconClass: 'fa-solid fa-calendar-days', children: [], isActive: false },
  ];

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpand(menuItem: MenuItem) {
    menuItem.expanded = !menuItem.expanded;
  }

  setActiveItem(selectedItem: MenuItem) {
    this.menuItems.forEach(item => item.isActive = false); // Clear all active states
    selectedItem.isActive = true; // Set the selected item to active
  }
  
  onItemClicked(item: MenuItem) {
    item.isActive = !item.isActive; // Toggle the active state of the clicked item
  }
  
  
  resetActiveItem(menuItem: MenuItem, activeItem: MenuItem) {
    if (menuItem !== activeItem) {
      menuItem.isActive = false;
    } else {
      menuItem.isActive = true;
    }
    menuItem.children.forEach(child => {
      this.resetActiveItem(child, activeItem);
    });
  }
  toggleSubMenu(menuItem: MenuItem): void {
    if (menuItem.children) {
      menuItem.expanded = !menuItem.expanded;
    }
  }

  setActiveMenu(menuItem: MenuItem): void {
    this.activeMenu = menuItem;
  }

  onHover(item: MenuItem) {
    if (this.isCollapsed) {
      item.isHovered = true;
    }
  }

  onHoverOut(item: MenuItem) {
    if (this.isCollapsed) {
      item.isHovered = false;
    }
  }

  private collapseTimeout: any;
  activeItem: any = null;

  onMouseEnter() {
    clearTimeout(this.collapseTimeout);
    this.isCollapsed = false;
  }

  onMouseLeave() {
    this.collapseTimeout = setTimeout(() => {
      this.isCollapsed = true;
    }, 10000); // 20 seconds
  }
  ngOnDestroy() {
    clearTimeout(this.collapseTimeout); // Clear timeout on component destroy to prevent memory leaks
  }
 
}
