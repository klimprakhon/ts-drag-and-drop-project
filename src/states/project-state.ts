import { Project, ProjectStatus } from "../models/project.js";
// Project State Management
type Listeners<T> = (item: T[]) => void;

class State<T> {
  protected listeners: Listeners<T>[] = [];

  addListener(listenerFN: Listeners<T>) {
    this.listeners.push(listenerFN);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.updateListener();
  }

  moveProject(projId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((proj) => proj.id === projId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener();
    }
  }

  private updateListener() {
    for (const listenerFN of this.listeners) {
      listenerFN(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
