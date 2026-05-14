import { patient, reports } from '../data/mockPatient';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function authenticatePatient({ patientId, method }) {
  await wait(800);

  if (!patientId && method !== 'qr') {
    throw new Error('Patient ID is required');
  }

  return {
    token: 'mock-patient-session-token',
    patient,
  };
}

export async function fetchPatientReports() {
  await wait(700);
  return reports;
}

export async function startReportAnalysis() {
  await wait(500);
  return {
    scanId: 'SCAN-LOCAL-0526',
    status: 'RUNNING',
  };
}
