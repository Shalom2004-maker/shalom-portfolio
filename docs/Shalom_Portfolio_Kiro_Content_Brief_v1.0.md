# SHALOM NDAHIRIWE
## Portfolio Content & Kiro CLI Implementation Brief
Version: 1.0
Purpose: Source-of-truth content for implementing the personal developer portfolio.

---

## 1. PERSONAL IDENTITY

Full name:
SHALOM NDAHIRIWE

Professional title:
Full-stack Developer

Public location:
Rajkot, Gujarat, India

Short introduction:
I’m a B.Tech (IT) student and full-stack developer who enjoys building software to solve practical problems. I’m interested in understanding how systems work, learning new technologies, and turning what I learn into working applications.

Longer bio:
I’m a B.Tech (IT) student and full-stack developer who enjoys building software to solve practical problems.

I like going deeper than simply making something work. I want to understand the logic, concepts, and systems behind what I build. When I encounter something difficult, I research it, learn from different sources, put the knowledge into practice, and observe the results.

My approach is simple: understand the problem, learn what is required, build it, test it, and improve it.

Availability:
Available for opportunities. User has stated practical availability of approximately 12 hours/day, 6 days/week. Do not publish the exact hours unless explicitly desired.

---

## 2. HERO CONTENT

Name:
SHALOM NDAHIRIWE

Current working headline:
I BUILD WEB EXPERIENCES.

Supporting statement:
I’m a web developer who builds thoughtful, functional web applications with modern technologies, clean interfaces, and attention to the details that make software feel complete.

Hero social links:
GitHub: https://github.com/Shalom2004-maker
LinkedIn: https://www.linkedin.com/in/shalom-ndahiriwe-747944380/

Resume:
Not supplied yet. Keep a placeholder.

CTA labels:
Not finalized. Suggested:
- Explore Work
- GitHub

Status:
Do not imply full-time employment. A suitable status is:
AVAILABLE FOR OPPORTUNITIES

---

## 3. PROJECT PORTFOLIO

Selected projects:
1. LetChat
2. ParkEase
3. Paradise Glass Hotel
4. NexGen Solution

Each project should clearly distinguish:
- What the project is
- Problem/purpose
- Main users
- Main capabilities
- What Shalom personally implemented
- Technologies intentionally used
- Current status
- Important technical challenge
- Future improvements
- Live demo/repository where available

Do not claim unfinished or mocked functionality as production functionality.

---

# 3.1 LETCHAT

Project:
LetChat

Live demo:
https://glide-talk-platform.vercel.app/login

Repository:
https://github.com/Shalom2004-maker/glide-talk-platform

Role:
Developer

Overview:
LetChat is a web-based messaging platform focused on familiar real-time communication.

The project originally began as an experiment with Lovable to explore what the platform was capable of. After seeing the potential of the idea, the project became an opportunity to develop the prototype into a more useful communication platform. It remains a work in progress.

Problem / purpose:
The project did not begin with a fully defined product problem. It began as an experiment. During development, the idea showed potential to become a useful messaging platform if continued and finalized.

Target users:
Anyone who is able to use an online chat application.

Current user capabilities:
- Create an account
- Authenticate through email confirmation
- Send and receive messages
- Chat when users are online
- See online status
- See whether messages have been read
- See typing indicators
- Share documents
- Use emojis
- Use responsive chat interfaces

Messaging:
Messaging is intended to be real-time. Messages can be sent and received directly, and a typing indicator shows when another user is writing.

Authentication:
Authentication uses email confirmation through Supabase.

Personal implementation:
- Supabase integration
- Development and implementation processes
- Testing
- Backend integration
- Real-time messaging functionality
- Typing indicator

Intentional technologies:
- TypeScript
- Supabase

Hardest technical challenge:
No major difficult technical issue has been encountered yet. Voice and video calling are expected to be one of the more technically demanding future additions.

Learning:
Consistency in dealing with every part of the project and maintaining that consistency throughout development.

Future improvements:
- Voice calls
- Video calls
- Chatbot / AI assistant
- Additional unfinished components and communication features

Current status:
Work in progress. Core messaging functionality exists, but some components and planned features still need to be implemented.

Important wording:
Do not describe LetChat as a finished production chat platform.

---

# 3.2 PARKEASE

Project:
ParkEase

Repository:
https://github.com/Shalom2004-maker/park_ease

Live demo:
Not deployed yet.

Role:
Developer

Overview:
ParkEase is a smart parking platform intended to help drivers discover parking, check availability, select a parking slot, reserve it, pay, and navigate to the parking location.

Problem:
Drivers can waste time searching for parking and may not know whether spaces are available before reaching a location. ParkEase aims to make parking discovery and reservation more predictable.

Users:
- Drivers / Customers
- Parking Owners
- Administrators

Driver capabilities:
- Create account / sign in
- Search nearby parking
- Filter parking results
- View parking details
- View pricing, security, ratings, and availability
- Select a parking slot
- Make a reservation
- Make a payment
- Receive booking confirmation
- Navigate to the parking location
- Manage bookings
- Manage vehicles
- View active parking sessions
- View booking history
- Receive notifications/offers

Parking Owner capabilities:
The planned product includes:
- Owner onboarding
- Parking-location management
- Floor management
- Slot management
- Pricing and operating hours
- Booking management
- Live occupancy
- Earnings/payouts
- Reports
- Notifications/profile

Administrator capabilities:
- Manage users
- Manage parking owners
- Approve parking locations
- Manage parking locations
- Monitor bookings
- Manage/monitor payments
- Manage reviews/offers
- Notifications
- Analytics/reports
- System settings/audit

Availability model:
Parking locations are divided into floors and individual slots.

Important slot states:
- Available
- Reserved
- Occupied
- Blocked

Availability should be checked for the requested time period. A confirmed booking should prevent another booking from using the same slot for an overlapping period.

Booking flow:
Search Parking
→ Select Parking Location
→ View Details
→ Select Date and Time
→ Select Floor and Slot
→ Review Booking
→ Payment
→ Booking Confirmation
→ Navigate to Parking
→ Arrive and Start Parking Session
→ Exit and Complete Session

Parking-session lifecycle:
Available
→ Reserved
→ Arriving
→ Entry Verified
→ Occupied
→ Extended (optional)
→ Exit
→ Completed

Cancellation is a separate lifecycle outcome.

Payment:
The current development stage uses a mocked payment system.

The mock flow can simulate:
- Successful payment
- Failed payment
- Cancelled payment
- Pending payment

Do not claim that ParkEase currently processes real payments or stores real card information.

Personal implementation:
Shalom is implementing ParkEase using Flutter with Supabase as the backend.

Implementation includes:
- Interface
- Navigation
- Parking discovery
- Parking details
- Slot selection
- Booking flow
- Supabase/backend integration
- Mocked payment flow
- Exact-location navigation

Hardest technical problem:
Keeping parking availability and booking states consistent.

Key concern:
A slot must not be double-booked for overlapping time periods. Booking, payment, and parking-session states must remain consistent.

Strong portfolio story:
The important engineering problem is state management across the parking lifecycle:
Available → Reserved → Occupied → Completed,
while preventing conflicting bookings.

Intentional technologies:
- Flutter
- Dart
- Supabase
- PostgreSQL / PL/pgSQL where applicable

Do not use GitHub's automatically detected language list as the portfolio technology list.

Current status:
Development project. Do not describe it as a production-ready deployed service.

---

# 3.3 PARADISE GLASS HOTEL

Project:
Paradise Glass Hotel

Repository:
https://github.com/Shalom2004-maker/paradise-glass-hotel

Live demo:
Not deployed.

Role:
Developer

Overview:
Paradise Glass Hotel is a web-based hotel management system using a glassmorphism-oriented interface. It provides experiences for hotel staff/admins and guests.

Problem:
Small hotels may manage rooms, guests, and reservations through disconnected spreadsheets, notebooks, or phone calls. The project explores a centralized system for hotel operations and a self-service guest portal.

Users:
- Hotel admins/staff
- Registered guests
- Visitors

Guest capabilities:
- Browse public hotel pages
- Browse and filter rooms
- Start a booking
- View own bookings
- Edit profile
- Change display name/avatar
- Switch light/dark theme

Admin capabilities:
- View dashboard
- Manage rooms
- Manage reservations
- Manage bookings
- View/manage guests
- Use settings

Room statuses:
- Available
- Occupied
- Maintenance
- Reserved

Booking:
A signed-in guest can browse/filter rooms and start a booking from a room card. Bookings can appear in guest My Bookings and the admin booking/reservation areas.

Payment:
There is no payment provider and no card-entry/checkout/charging system.

Bookings are requests intended to be settled at the hotel.

Implemented:
- Account creation
- Sign-in/sign-out
- Admin vs regular-user roles
- Admin-only dashboard
- Guest profiles
- Light/dark theme
- Responsive layouts
- Landing page
- Mobile menu
- Admin dashboard areas
- Guest room browsing
- Guest bookings
- Guest profile
- Responsive sidebar/mobile drawer
- Agent/MCP integration with an approval/consent screen

Technical architecture / intentional project technologies:
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
- React Router
- TanStack Query
- Lovable Cloud backend/auth/database/serverless capabilities

Important technical problem:
Sign-in redirect race.

The session could become available before the user's role was known. This could briefly treat an administrator as a regular user and redirect them to the guest home.

The solution was to wait for the role check before redirecting.

Another authorization issue:
Earlier, protected pages could require admin access too broadly. The fix was to make admin requirements explicit per page.

Lessons:
- Authenticated does not always mean role information is ready.
- Permission checks should be enforced appropriately on the server.
- Roles should come from the roles system rather than being trusted from browser state.
- Centralized design tokens help maintain glassmorphism across light/dark themes.
- Responsive design is easier when considered from the beginning.

Future improvements:
- Live room/reservation/bookings database
- Date-range booking
- Availability validation
- Double-booking prevention
- Payments/invoicing
- Forgot-password/email confirmation
- Check-in/check-out
- Housekeeping/maintenance tracking
- Search/filter/pagination/export
- Real hotel content/photos

Current status:
Partly functional. Authentication, guest access, admin access, themes, navigation, responsiveness, and the main foundation are demonstrable. The operational hotel core is incomplete. Room/reservation content is partly sample data, booking availability validation is incomplete, and there is no payment system.

Important wording:
Do not describe Paradise Glass Hotel as a fully operational hotel booking/payment system.

---

# 3.4 NEXGEN SOLUTION

Project:
NexGen Solution

Repository:
https://github.com/Shalom2004-maker/NexGen-Solution

Live demo:
Not deployed.

Role:
Developer

Overview:
NexGen Solution is a practice-based web Employee Management System for a fictional company. It is designed to centralize employee and project-related workflows such as tasks, leave requests, payroll inputs, and HR administration.

Purpose:
The project was built as a university/practice project to create a realistic, structured database-driven web system rather than an enterprise-level HR product.

Technology:
Frontend:
- HTML5
- CSS3
- Bootstrap
- JavaScript

Backend:
- PHP 8+

Database:
- MySQL

Server:
- Apache through XAMPP or similar local server

Roles:
1. Guest
2. Employee
3. Project Leader
4. HR
5. Admin

Guest:
- View public company pages
- Send inquiries

Employee:
- Login
- View assigned tasks
- Update task status
- Apply for leave
- View leave history
- View salary slips

Project Leader:
- Login
- Assign tasks
- Track project progress
- Review/recommend leave requests
- Submit payroll inputs such as overtime/bonuses

HR:
- Manage employee records
- Approve/reject leave
- Process payroll
- View/reply to inquiries

Admin:
- Manage users and roles
- Full system access

Core modules:
- Authentication
- Role-based access
- Public inquiry/contact system
- Task management
- Leave management
- Payroll
- Salary slips
- Role-specific dashboards

Database entities:
- Users
- Roles
- Employees
- Projects
- Tasks
- Leave requests
- Payroll inputs
- Salary slips
- Inquiries

Important strengths:
- Role-based access control
- Multiple user workflows
- Relational database design
- Employee/task/leave/payroll workflows
- PHP/MySQL implementation
- Separation of responsibilities by role

Current framing:
Practice-based university project. Do not present it as an enterprise HR platform.

---

## 4. EXPERIENCE

### Internship | PHP & CMS Development
Organization:
UR-CAVM, Rwanda

Period:
Dates are estimated.

2022:
Approximately April–May 2022. Exact dates are not confirmed.

2023:
Approximately late May–June 2023. Exact dates are not confirmed.

Focus:
- PHP
- CMS-based web development
- Drupal
- WordPress
- Joomla
- Wix

Experience:
Gained practical exposure to PHP and web development, including working with content management systems such as Drupal, WordPress, Joomla, and Wix.

Known supervisors / assistants:
- RUKUNDO Emile
- Benoit
- Munezero
- One additional assistant/supervisor name not currently remembered

Important:
Do not invent the missing person's name or exact dates.

### Independent Web Development
2023 – Present

Since 2023, Shalom has continued working on web development through personal, academic, and project-based development.

Focus:
- Building web applications
- Learning new technologies through implementation
- Researching difficult concepts
- Testing ideas in practical projects
- Expanding toward full-stack development

Formal employment:
No formal full-time developer role has been stated.

Do not present independent projects as employment.

---

## 5. EDUCATION

Current known information:
B.Tech (IT)
RK University
Rajkot, Gujarat

Expected period:
2024–2028

Verify the exact enrollment/start year before publishing.

---

## 6. CAPABILITIES

Do not use subjective percentages such as "Frontend 80%" or "Backend 60%" unless the user later specifically requests them.

Working technology inventory:

Frontend:
- React
- Next.js
- TypeScript
- JavaScript
- HTML
- CSS
- Tailwind CSS

Backend / data:
- PHP
- Supabase
- PostgreSQL
- PL/pgSQL
- C# / ASP.NET (currently learning)

Mobile:
- Flutter
- Dart

Tools:
- Git
- GitHub
- VS Code
- Vercel
- Figma

Currently learning:
- C#
- ASP.NET
- React
- Flutter

Important:
Before final publication, verify every technology against actual projects and experience. Do not claim expertise merely because a technology is being studied.

---

## 7. DEVELOPMENT PHILOSOPHY

Core idea:
"Do what you have to do in the time you have to do it."

Working interpretation:
Understand the problem, research what is needed, build the solution, test it, and improve it.

The portfolio should communicate:
- Curiosity
- Consistency
- Practical learning
- Problem solving
- Willingness to understand systems deeply
- Building through experimentation

Avoid exaggerated claims such as "expert", "industry-leading", "10x developer", etc.

---

## 8. CONTACT

Email:
shalomndahi@gmail.com

GitHub:
https://github.com/Shalom2004-maker

LinkedIn:
https://www.linkedin.com/in/shalom-ndahiriwe-747944380/

Phone:
+91 743 381 3806

Resume:
Not supplied yet. Keep placeholder.

Preferred closing direction:
LET'S BUILD SOMETHING USEFUL.

Primary contact CTA:
Start a conversation

---

## 9. PORTFOLIO PAGE STRUCTURE

Keep this section order unless a deliberate design reason requires a change:

1. Navigation
2. Hero
3. Selected Work
4. About
5. Capabilities
6. Experience
7. Education
8. Contact
9. Footer

There is also a broader GitHub section / CTA where appropriate.

---

## 10. VISUAL / UX DIRECTION

Overall identity:
Dark digital-laboratory aesthetic.

The portfolio should feel:
- Technical
- Focused
- Modern
- Precise
- Experimental without becoming chaotic
- Professional

Design principles:
- Dark-first visual language
- Strong typography
- Clear information hierarchy
- Selective glass effects
- Projects should dominate the visual hierarchy
- Avoid generic template appearance
- Keep decoration purposeful

Motion:
Anime.js is the preferred motion candidate.

Potential motion:
- Hero text reveal
- Scroll-triggered section entrances
- Project image scale/parallax
- Timeline line growth/node activation
- Button arrow movement
- Subtle pointer-reactive surfaces
- SVG animation only where meaningful

Respect prefers-reduced-motion.

Icons:
Lucide is the preferred icon library candidate.

Responsive:
- Desktop: full composition
- Tablet: reduce spatial complexity while preserving hierarchy
- Mobile: single-column flow and simplified decoration
- Do not depend on hover for essential interaction
- Prevent horizontal overflow

Accessibility:
- Semantic HTML
- Keyboard navigation
- Visible focus states
- Meaningful labels for icon-only controls
- Readable contrast
- Reduced-motion support
- Never communicate essential information through animation alone

Performance:
- Prefer transform/opacity animation
- Optimize/lazy-load media
- Avoid unnecessary client-side JavaScript
- Measure performance before launch

SEO:
- Unique title and description
- Semantic headings
- Open Graph metadata
- Descriptive project content and alt text
- Canonical URL and sitemap/robots as appropriate

---

## 11. PORTFOLIO IMPLEMENTATION DIRECTION

Proposed stack:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Anime.js
- Lucide
- Vercel

Forms:
React Hook Form + Zod are candidates, not yet locked.

Contact delivery:
Resend or another suitable service, not yet locked.

Do not assume pending choices are final.

Primary development workflow:
Kiro CLI.

Kiro CLI should use this document as content and product context. It should not invent missing personal details.

---

## 12. CONTENT / IMPLEMENTATION RULES FOR KIRO

1. Use real information only.
2. Preserve uncertainty where dates/details are uncertain.
3. Do not invent organizations, job titles, metrics, users, clients, payment providers, or achievements.
4. Do not describe mock functionality as real.
5. Do not describe unfinished projects as production-ready.
6. Distinguish internship, independent development, university work, and formal employment.
7. Use the user's stated intentional technology stack when describing projects, not GitHub's auto-detected language percentages.
8. Project descriptions should focus on problem, implementation, engineering decisions, and current status.
9. Keep copy concise enough for a portfolio UI.
10. Preserve room for project detail pages or expandable content if needed.
11. Keep the dark digital-laboratory identity.
12. Do not redesign the entire portfolio without a clear reason. Improve the existing structure and replace placeholders with real content.
13. Ensure every project link works.
14. Keep mobile behavior polished.
15. Verify animations, accessibility, performance, navigation, and external links before final deployment.

---

## 13. KNOWN OPEN ITEMS

These are intentionally unresolved. Keep placeholders until confirmed:

- Final hero headline
- Resume URL/file
- Exact internship dates
- Full name of the additional UR-CAVM assistant
- Exact B.Tech enrollment/start year
- Final capability/technology list
- Final project ordering
- Project screenshots
- Final contact form decision
- Contact email delivery service
- Final Anime.js interaction scope
- Final fonts
- Final accent system
- Whether exact availability hours should be public

---

## 14. CONTENT PRIORITY

For the portfolio's Selected Work section, prioritize projects that demonstrate meaningful engineering work.

Project storytelling should emphasize:
- LetChat: real-time messaging + Supabase integration + experimentation becoming a project
- ParkEase: booking/availability state management + Flutter/Supabase + mocked payment architecture
- Paradise Glass Hotel: authentication/authorization + role handling + responsive UI + glassmorphism system
- NexGen Solution: PHP/MySQL + role-based access + multi-role HR/project workflows

---

## 15. FINAL CONTENT STANDARD

The portfolio should present Shalom as:
A B.Tech (IT) student and developing full-stack developer who learns by understanding systems, researching difficult concepts, building practical applications, testing them, and improving them.

The portfolio should demonstrate capability through real projects rather than exaggerated claims.

End of document.
