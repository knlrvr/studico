import { Id } from "../../../../convex/_generated/dataModel";
import { createContext, useContext } from "react";

const ProjectContext = createContext<Id<'projects'> | null>(null);

export function ProjectProvider({
    projectId, 
    children
}: {
    projectId: Id<'projects'>,
    children: React.ReactNode,
}) {
    return (
        <ProjectContext.Provider value={projectId}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjectId(): Id<'projects'> {
    const context = useContext(ProjectContext);
    if (context === null) {
        throw new Error('useProjectId must be used within a ProjectProvider');
    }

    return context;
}