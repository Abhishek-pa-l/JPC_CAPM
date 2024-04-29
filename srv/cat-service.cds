using my.approval as my from '../db/data-model';

service CatalogService {
     entity Approvals as projection on my.Approval;
}
