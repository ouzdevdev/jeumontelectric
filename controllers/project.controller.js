// project.controller.js
const { Project } = require('../models');

/**
 * Récupère tous les projets.
 * @route GET /api/projects
 * @access Privé
 * @returns {Object} - Les projets récupérés.
 * @throws {Error} - Une erreur si la récupération des projets échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllProjects(req, res);
 */
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: {
                data_active: true
            },
        });

        if (!projects.length) {
            return res.status(404).json({ message: 'Aucun projet trouvé' });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des projets', error: error.message });
    }
}

/**
 * Récupère un projet par son ID.
 * @route GET /api/projects/:id
 * @access Privé
 * @param {string} id - L'ID du projet.
 * @returns {Object} - Le projet trouvé.
 * @throws {Error} - Une erreur si la récupération du projet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getProjectById(req, res);
 */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findOne({ where: { project_uuid: id } });
        
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du projet', error: error.message });
    }
}

/**
 * Crée un nouveau projet.
 * @route POST /api/projects
 * @access Privé
 * @param {string} project_ref - La référence du projet.
 * @param {string} project_label - Le libellé du projet.
 * @param {string} project_description - La description du projet.
 * @returns {Object} - Le nouveau projet créé.
 * @throws {Error} - Une erreur si la création du projet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewProject(req, res);
 */
const createNewProject = async (req, res) => {
    try {
        const { project_ref, project_label, project_description } = req.body;

        const project = await Project.create({
            project_ref, project_label, project_description
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du projet', error: error.message });
    }
}

/**
 * Supprime un projet par son ID.
 * @route DELETE /api/projects/:id
 * @access Privé
 * @param {string} id - L'ID du projet à supprimer.
 * @returns {Object} - Message de succès.
 * @throws {Error} - Une erreur si la suppression du projet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteProject(req, res);
 */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await Project.destroy({
            where: {
                project_uuid: id
            }
        });
        
        res.status(200).json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du projet', error: error.message });
    }
}

module.exports = {
    createNewProject,
    getAllProjects,
    getProjectById,
    deleteProject
}
