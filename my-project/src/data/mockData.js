export const mockUsers = [
  { id: 'u1', name: 'Alice Smith', email: 'alice@example.com', online: true, bio: 'Frontend Dev | Coffee enthusiast' },
  { id: 'u2', name: 'Bob Johnson', email: 'bob@example.com', online: false, bio: 'Backend Engineer' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com', online: true, bio: 'UI/UX Designer' },
  { id: 'u4', name: 'Diana Prince', email: 'diana@example.com', online: true, bio: 'Product Manager' },
  { id: 'u5', name: 'Evan Davis', email: 'evan@example.com', online: false, bio: 'QA Tester' },
  { id: 'u6', name: 'Fiona Gallagher', email: 'fiona@example.com', online: true, bio: 'Fullstack Dev' },
  { id: 'u7', name: 'George Miller', email: 'george@example.com', online: false, bio: 'DevOps' },
  { id: 'u8', name: 'Hannah Abbott', email: 'hannah@example.com', online: true, bio: 'Data Scientist' },
  { id: 'u9', name: 'Ian Wright', email: 'ian@example.com', online: true, bio: 'Mobile App Developer' },
  { id: 'u10', name: 'Julia Roberts', email: 'julia@example.com', online: false, bio: 'Marketing' }
];

export const mockMessages = [
  { id: 'm1', text: 'Hey everyone! Welcome to Volox.', sender: { id: 'u1', name: 'Alice Smith' }, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm2', text: 'Looks great! Can\'t wait to start using it.', sender: { id: 'u2', name: 'Bob Johnson' }, timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm3', text: 'The dark mode is so clean.', sender: { id: 'u3', name: 'Charlie Brown' }, timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm4', text: 'I agree, the UI is really polished.', sender: { id: 'u4', name: 'Diana Prince' }, timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm5', text: 'Are we testing the socket connections today?', sender: { id: 'u1', name: 'Alice Smith' }, timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm6', text: 'Not yet, just the frontend UI for now.', sender: { id: 'u6', name: 'Fiona Gallagher' }, timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm7', text: 'Got it. I\'ll help out with some mock data then.', sender: { id: 'u1', name: 'Alice Smith' }, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm8', text: 'Perfect.', sender: { id: 'u6', name: 'Fiona Gallagher' }, timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm9', text: 'Hello! I\'m new here.', sender: { id: 'me', name: 'Current User' }, timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), roomId: 'global', isOwn: true },
  { id: 'm10', text: 'Welcome! Good to have you.', sender: { id: 'u1', name: 'Alice Smith' }, timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), roomId: 'global', isOwn: false },
  { id: 'm11', text: 'Thanks! How does everything work?', sender: { id: 'me', name: 'Current User' }, timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), roomId: 'global', isOwn: true },
  { id: 'm12', text: 'We just chat here for now. More features coming soon.', sender: { id: 'u3', name: 'Charlie Brown' }, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), roomId: 'global', isOwn: false }
];

export const mockRooms = [
  { id: 'r1', name: 'General', description: 'General discussion for everyone', memberCount: 156, joined: true },
  { id: 'r2', name: 'Tech Talk', description: 'Coding, architecture, and technology', memberCount: 42, joined: true },
  { id: 'r3', name: 'Design', description: 'UI/UX, graphics, and styling', memberCount: 28, joined: false },
  { id: 'r4', name: 'Gaming', description: 'Video games, board games, etc.', memberCount: 89, joined: false },
  { id: 'r5', name: 'Random', description: 'Non-work related banter', memberCount: 210, joined: true },
  { id: 'r6', name: 'Announcements', description: 'Official project updates', memberCount: 450, joined: false }
];
