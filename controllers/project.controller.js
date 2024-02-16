// project.controller.js
const { Project } = require('../models');

// Récupérer tous les projets
// GET /api/projects
// Accès : Privé
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        if (!projects.length) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching projects', error: error.message });
    }
}

// Récupérer un projet par son ID
// GET /api/projects/:id
// Accès : Privé
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ where: { project_uuid: id } });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching project', error: error.message });
    }
}

// Créer un nouveau projet
// POST /api/projects
// Accès : Privé
const createNewProject = async (req, res) => {
    try {
        const { project_ref, project_label, project_description } = req.body;
        const project = await Project.create({
            project_ref, project_label, project_description
        });
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating project', error: error.message });
    }
}

// Supprimer un projet par son ID
// DELETE /api/projects/:id
// Accès : Privé
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await Project.destroy({
            where: {
                project_uuid: id
            }
        });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting project', error: error.message });
    }
}

module.exports = {
    createNewProject,
    getAllProjects,
    getProjectById,
    deleteProject
}
