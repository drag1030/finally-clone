import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  location: String,
  state: String,
  pointOfContact: String,
  pocMobileNumber: String,
  pocEmail: String,
  pocFax: String,
  pocDesignation: String,
  address: String,
  gstin: String,
  gstStatus: String,
  gstinCertificate: String
});

const accountSchema = new mongoose.Schema({
  name: String,
  accountNumber: String,
  confirmAccountNumber: String,
  ifsc: String,
  isDefault: Boolean,
  isDisabled: Boolean,
  cancelledCheque: String
});

const vendorSchema = new mongoose.Schema({
  vendorId: { type: String, unique: true },
  vendorCountry: String,
  policy: String,
  legalName: String,
  tradeName: String,
  isGstRegistered: Boolean,
  fullAddress: String,
  vendorType: String,
  paymentTerm: String,
  
  // Tax Information
  pan: String,
  panAttachment: String,
  tdsPercentage: Number,
  tdsEffectiveStartDate: Date,
  tdsEffectiveEndDate: Date,
  ldcUpperLimit: Number,
  ldcEffectStartDate: Date,
  ldcEffectEndDate: Date,
  lowerExceptionCertificate: String,
  
  // MSME Details
  isMsmeRegistered: Boolean,
  msmeRegistrationNumber: String,
  
  // Location Details
  locations: [locationSchema],
  
  // Account Details
  accounts: [accountSchema],
  
  // Attachments
  taxExemptionCertificate: String,
  otherDocuments: [String],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Vendor = mongoose.model('Vendor', vendorSchema);