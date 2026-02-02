# Task Manager

## Demo Video

<video src="video/preview_video.mp4" controls></video>

[▶️ Watch the demo](video/preview_video.mp4)

## Overview

Task Manager is a cross-platform app built with Expo and React Native. It helps you create, track, filter, and organize tasks with priorities and due dates across Android and iOS.

## Features

- Create, edit, and delete tasks
- Mark tasks as complete or incomplete
- Set priority and due date/time
- Search tasks by title or description
- Filter by status and priority
- Sort by deadline, priority, date created, or alphabetical
- Swipe actions on task cards for quick edit or delete
- Automatic persistence with local storage

## Tech Stack

- Expo + React Native
- Expo Router for file-based routing
- React Hook Form for task forms
- AsyncStorage for local persistence
- NativeWind (Tailwind CSS) for styling
- TypeScript for type safety

## App Routes

| Route      | Screen      | Description                         |
| ---------- | ----------- | ----------------------------------- |
| /          | Home        | Task list, search, filters, sorting |
| /add       | Create Task | New task form                       |
| /edit/[id] | Edit Task   | Edit an existing task               |
| /task/[id] | Task Detail | Task details, status, actions       |
| +not-found | Not Found   | Friendly 404 for invalid routes     |

## Data Model

The task model is defined in [task.ts](file:///c:/Users/Admin/Desktop/task-manager/types/task.ts).

```ts
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  priority: "high" | "medium" | "low";
  completed: boolean;
  completedAt?: Date;
}
```

## Local Storage

Tasks are stored using AsyncStorage. On startup, tasks are loaded and hydrated back into Date objects. Updates are saved automatically after any change.

Storage key:

- tasks

## Project Structure

```
app/
  +not-found.tsx      Not Found screen
  _layout.tsx         Root layout and providers
  index.tsx           Home screen
  add.tsx             Create task screen
  edit/[id].tsx       Edit task screen
  edit/index.tsx      Redirects /edit to home
  task/[id].tsx       Task detail screen
components/
  TaskForm.tsx        Task create/edit form
  TaskCard.tsx        Task list item with swipe actions
  FilterSortBar.tsx   Filters and sorting controls
context/
  TaskContext.tsx     App state and persistence
types/
  task.ts             Task types
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npx expo start
```

From the Expo CLI, you can open:

- Android emulator
- iOS simulator
- Web
- Expo Go

## Scripts

- Start: `npm run start`
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`
- Lint: `npm run lint`
