# Task Manager App - Functionality Summary

## Overview
This is a React + TypeScript to-do app that lets users create, manage, sort, and persist tasks with deadline-based prioritization. The UI is styled with modern CSS and includes smooth animations for better user experience.

## Core Features

- Add tasks with:
  - Task name
  - Deadline in days
- Remove tasks from the list
- Prevent invalid submissions:
  - Empty task name is not allowed
  - Deadline must be greater than 0
  - Add button stays disabled until inputs are valid

## Task Persistence

- Tasks are saved in browser `localStorage`
- Saved tasks are restored automatically when the app reloads
- Existing legacy items are safely migrated with generated IDs if needed

## Sorting and Ordering

- Default ordering is by deadline (ascending):
  - Lower deadline appears first (for example, 2 days before 4 days)
- Sort toggle button allows reversing order:
  - Low to High
  - High to Low
- Manual reordering controls per task:
  - Move Up
  - Move Down

## Animations and Interaction

- Smooth item enter animation when tasks appear
- Staggered visual loading effect across list items
- Smooth exit animation before a task is removed
- Remove button is temporarily disabled while exit animation runs

## UI/UX Improvements

- Modern, clean layout with responsive container sizing
- Styled header area with input section and action controls
- Enhanced button, hover, and focus states
- Empty-state message shown when no tasks exist

## Technical Notes

- Built with React functional components and hooks:
  - `useState`
  - `useEffect`
- Strong typing via TypeScript interfaces
- Unique task IDs used for stable rendering and reliable updates
