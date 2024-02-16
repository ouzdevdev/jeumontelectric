const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correpond au projet liée l'entreprise Juemont
// '7bae7e1f-3ab0-4d2d-9565-2813990243f5', '12AINP0001', 'Control & Retrofit CVT Compressor', '2 interventions sur software en 2015 et 2016 - Client à recontacter
// ', '2023-07-17 10:03:36.965039');
// '585d86c6-e509-42eb-91b1-71ac839e90c1', '12Amar0024
// XV20389', 'Replacement of control system equipment on Propulsion', 'No maintenance Follow up since 2015. 2023: Survey on board done on April folowing client request-  Purpose: to get back the vessel under JE control
// ', '2023-07-17 10:03:36.965039');
// '16e069be-b129-42d2-a68b-b4493a1f131f', '16Amar0056
// XV20299', 'Replacement of control system equipment on Propulsion', 'DD Singap: Maintenance in Fev 2023 (Voir Muhammed)
// ', '2023-07-17 10:03:36.965039');
// '99785d3c-42b5-4d02-8730-2d25da3f1345', 'XV17980', 'Replacement of control system equipment on Propulsion
// Voir historique maintenance dans CCP-Drive-Marine-Waranty DCL', 'Maintenance planned in Oct 2023 during Dry Dock
// ', '2023-07-17 10:03:36.965039');
// '01b408d2-cdcf-4291-b18d-32c0f7f19458', 'XV18169
// XV20395', 'Replacement of control system equipment on Propulsion', 'Survey en Mars 2023 - Dépannage réalisé Jun 2023 - PLC & HMI freezing Log & mail client - Rail à changer sur block WAGO - Next DD en 2025.
// ', '2023-07-17 10:03:36.965039');
// '15eb963b-be10-414b-8894-073990076820', 'V18549 -M10', '1 VSD intalled on Chiller JCI in Nov 2022', '1 Year Maintenance to be planned in Nov 2023
// ', '2023-07-17 10:03:36.965039');
// '884d4e7e-4a50-4bbe-af93-4467a687ca4c', 'V18903
// XV20339 (DD)', 'Retrofit bateau 4x Système de Propulsion ( Ctrl & Automatisme) - Voir project YSM ', 'Maintenance during Dry Dock in Avril 2023 - (Voir Roland)
// ', '2023-07-17 10:03:36.965039');
// '3c08799f-4615-4f81-b126-a695023fe2f4', 'XV18645', 'Replacement of control system equipment on Propulsion', 'Maintenance planned in 2023 ??
// ', '2023-07-17 10:03:36.965039');
// '11c059b6-0607-47c2-846a-2a41fe232caf', 'V17694', 'Complete Jeumont propulsion system (Motors included). ', 'Waranty survey done on April 2023- Software update (-5 Rpm - O Rpm) - TO CHECK
// ', '2023-07-17 10:03:36.965039');
// '7e5f0b61-7d39-45f0-9879-52aec0e29bde', 'S18814', 'MOTOR + VFD - Intalled and commisioned in 2022??
// Armoire elec in Etupe up to May 2023 - To clarify', 'To clarify what is the project? Job remaining in 2023?
// ', '2023-07-17 10:03:36.965039');
// '4ed13127-31a3-45b6-96d6-41128821eb57', 'V19335', 'MOTOR + VFD Intalled and commisioned in Oct 2022', 'Annual Maintenance Planned in Oct 2023?? Propal suivi maintenance from 2024 - To clarify
// ', '2023-07-17 10:03:36.965039');
// '137d6fdc-a402-4609-8fc4-5c92d7911aac', 'XV19468', 'Retrofit bateau 4x Système de Propulsion ( Ctrl & Automatisme) ', 'Dry Dock + Wet dock - Sept/Oct 2023
// ', '2023-07-17 10:03:36.965039');
// 'd53bc512-2c52-49af-b634-c3c19e2c0fef', 'XV20300', '3 Survey Made  (Mainly mecanical measure + PQM)- Retrofit propulsion drive ', 'Propiulsion Control Upgrade - Installation planned in DD Jan 2024
// ', '2023-07-17 10:03:36.965039');
// 'ccec51e4-b388-47fe-8af5-2f7bfa0e872e', 'V18549 - M20', '1 VSD intalled on Chiller JCI (Voir 2020) - To clarify. ', 'Commissioned in Jully 2023
// ', '2023-07-17 10:03:36.965039');
// '950c5290-af3a-4caa-a8bd-42e31d136314', 'V18549 - M30', '1 VSD will be intalled on Chiller ', 'Commisioning en Nov 2023
// ', '2023-07-17 10:03:36.965039');
// '47b90939-f069-49f6-b5d5-44ee9b6d5f77', 'V18993', 'New building - CVT x 2 installed on Chiller in Ficantieri in 2022 - Commissioning Oct 2023', 'Jonhson Control
// ', '2023-07-17 10:03:36.965039');
// '16c27a8b-d6fb-4ad6-855f-d409174cbc7d', 'V18993', 'New building - CVT x 2 to install on Chiller in Ficantieri shipyard - 09 2023', 'Jonhson Control
// ', '2023-07-17 10:03:36.965039');
// 'fca4d7c3-7b60-4ba6-9dae-1def2504cee1', 'XV19003
// XV20412', 'ELP9: VFD installation on Water Pump for VEOLIA - Paris - Installé en 2021
// Contrat maintenance XV20412', 'Maintenance planned in Sept 14th  2023? To clarify
// ', '2023-07-17 10:03:36.965039');
// '6aa1d386-dbe0-4961-971c-4ae7ddb75f02', 'V20088', 'To clarify what is the project?', 'Planning to clarify
// ', '2023-07-17 10:03:36.965039');
// '455fca36-aee5-49ce-90d1-d09f7e804295', 'I00733
// ', 'Plateforme Essais Machine Synchrone JE : Convertisseur de charge et entrainement', 'Client = JE Nord
// ', '2023-07-17 10:03:36.965039');
// 'Plateforme Essais Machine Synchrone JE : Convertisseur de lancement et de charge', 'RAS', '2023-07-17 10:03:36.965039');

const Project = sequelize.define('Project', {
    project_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
    },
    project_ref: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    project_label: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    project_created_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    project_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    }, {
    tableName: 'project',
    timestamps: false,
    }
);

module.exports = Project;
