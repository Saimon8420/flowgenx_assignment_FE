# FlowGenX Assignment

This is a Next.js project for a visual workflow editor. It allows users to create and manage complex workflows by connecting different types of nodes.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in the root of your project. Create a `.env` file and add the following:

```
NEXT_PUBLIC_API_URL=your_api_url
```

## Features

*   **Visual Workflow Editor:** A drag-and-drop interface to build and visualize workflows.
*   **Node-Based System:** Use different nodes for various actions:
    *   **Chat Input:** To start a workflow with user input.
    *   **LLM Call:** To perform a Large Language Model call.
    *   **Update DB:** To update a database.
*   **Real-time Status:** Nodes display their current status (e.g., running, completed, error).

## Project Structure

*   `src/app/components`: Contains the React components for the different nodes and the main workflow editor.
*   `src/app/hooks`: Contains custom hooks for fetching status details for the nodes.
*   `public`: Contains static assets like images and icons.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.