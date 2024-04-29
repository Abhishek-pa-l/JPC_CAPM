namespace my.approval;

entity Approval {
  key ICO_No : String;
  contract_title  : String;
  contract_type  : String;
  contract_no : String;
  supplier:String;
  purpose:LargeString;
  bckground:LargeString;
}
