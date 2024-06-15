nama database: okelaundry

tabel dan detail:
- admins
  * id (pk)
  * password
  * phone
  * name
  * email
- clothes
  * id (pk)
  * id_transaction (fk)
  * type
  * qty
  * price
  * total
- customer_reports
  * id (pk)
  * id_user (fk)
  * title
  * desc
  * report_date
  * trans_date
  * status
- managers
  * id (pk)
  * password
  * phone
  * name
  * email
- monthly_reports
  * id (pk)
  * income
  * date
- transactions
  * id (pk)
  * id_user (fk)
  * id_monthly_report (fk)
  * date
  * total_price
  * status
- users
  * id (pk)
  * password
  * phone
  * name
  * email