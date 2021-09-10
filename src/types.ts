export interface Clinic {
    name: string,
    stateName: string,
    availability: {
        from: string,
        to: string
    }
}

export interface ClinicsData {
    dental: [Clinic],
    vet: [Clinic]
}
