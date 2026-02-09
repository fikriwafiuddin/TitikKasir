table categories {
user_id int
id int [increment]
name varchar(25)
total_items int [default: 0]
sku_prefix varchar(5)
latest_sku varchar(10)
}

table products {
user_id int
id int [increment]
category_id int
sku varchar(10)
name varchar(25)
stock int
price int
image varchar
}

table orders {
id int [increment]
order_id varchar(10)
user_id varchar
total_amount int
date datetime
}

table order_item {
id int [increment]
user_id varchar
product_id int
order_id varchar(10)
product_name varchar(25)
unit_price int
sub_total int
quantity int
}

table user {
id int [increment]
user_id varchar
shop_name varchar(25)
latest_order_id varchar(10)
}

Ref: "categories"."id" < "products"."category_id"

Ref: "products"."id" < "order_item"."product_id"

Ref: "orders"."id" < "order_item"."order_id"
