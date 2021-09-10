export interface Clinic {
    name?: string,
    clinicName?: string
    stateName?: string,
    stateCode?: string,
    opening?: {
        from: string,
        to: string
    }
    availability?:{
        from: string,
        to: string
    }
}

export interface NormalizedClinic{
    name: string,
    clinicName: string,
    stateName:string,
    stateCode: string,
    opening: {
        from: string,
        to: string
    }
}

export interface ClinicsData {
    dental: [Clinic],
    vet: [Clinic]
}

export interface Query{
    state?: string,
    name?: string,
    opening?: string,
}
