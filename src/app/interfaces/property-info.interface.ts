import { Percision } from "./records.interface";

export interface PropertyInfo {
    listID:             number;
    propertyID:         number;
    yearBuilt:          number;
    yearRenovated:      number;
    name:               string;
    streetAddress:      string;
    neighborhood:       string;
    phone:              string;
    city:               string;
    adminFee:           number;
    appFee:             number;
    url:                string;
    favorite:           boolean;
    notes:              string;
    specials:           string;
    parking:            Parking;
    schoolsInfo:        SchoolsInfo;
    petInfo:            PetInfo;
    paidUtilities:      any[];
    floorplans:         Floorplan[];
    highValueAmenities: string[];
    unitAmenities:      string[];
    propertyAmenities:  string[];
    geocode:            Geocode;
    photos:             string[];
    section8:           boolean;
    studentHousting:    boolean;
    seniorHousing:      boolean;
    officeHours:        null;
    numUnits:           number;
    email:              null;
    role:               string;
    management:         null;
    managementOffices:  any[];
    regionalName:       null;
    regionalPhone:      null;
    regionalEmail:      null;
    onsiteManager:      null;
    thumbnails:         string[];
}

export interface Floorplan {
    floorplanID: number;
    bed:         number;
    bath:        number;
    sqft:        number;
    deposit:     number;
    photoUrl:    string;
    washerDryer: WasherDryer;
    price:       number;
    priceMax:    number;
    den:         boolean;
    isAvailable: boolean;
    available:   Date;
    comments:    string;
}

export enum WasherDryer {
    FullsizeFurnished = "FULLSIZE_FURNISHED",
}

export interface Geocode {
    Longitude: string;
    Latitude:  string;
    Percision: Percision;
    IsValid:   boolean;
}

export interface Parking {
    propertyID:     number;
    reserved:       boolean;
    reservedFeeMin: number;
    reservedFeeMax: number;
    covered:        boolean;
    coveredFeeMin:  number;
    coveredFeeMax:  number;
    garage:         boolean;
    garageFeeMin:   number;
    garageFeeMax:   number;
    detached:       boolean;
    detachedFeeMin: number;
    detachedFeeMax: number;
    breezeway:      boolean;
    attached:       boolean;
}

export interface PetInfo {
    allowed:          boolean;
    extraRent:        number;
    limit:            number;
    weight:           number;
    breedRestriction: boolean;
    nonRefundableFee: number;
}

export interface SchoolsInfo {
    propertyID:   number;
    district:     string;
    elementry:    string;
    intermediate: string;
    middle:       string;
    high:         string;
}
