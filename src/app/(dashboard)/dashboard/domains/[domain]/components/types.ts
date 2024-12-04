export interface DNSRecord {
  id: number;
  type: string;
  host: string;
  answer: string;
  ttl: number;
  priority?: number;
}

export interface AddDNSRecordFormData {
  type: string;
  name: string;
  value: string;
  ttl?: number;
  priority?: number;
}

export interface DomainInfo {
  domainName: string;
  expireDate: string;
  createDate: string;
  locked: boolean;
  autorenewEnabled: boolean;
  privacyEnabled: boolean;
  nameservers: string[];
  renewalPrice: number;
}
