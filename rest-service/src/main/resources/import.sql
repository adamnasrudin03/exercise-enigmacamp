
INSERT INTO `user` (`id`, `username`, `password`, `activated`) VALUES ('1', 'admin','{bcrypt}$2y$12$uR9goV6T5xbO2mG1OuYylOEEJbgLIH2w8Zk6eV1KUfxQbgPICrI12',true);
INSERT INTO `user`  (`id`, `username`, `password`, `activated`) VALUES ('2', 'user','{bcrypt}$2y$12$uR9goV6T5xbO2mG1OuYylOEEJbgLIH2w8Zk6eV1KUfxQbgPICrI12', true);

INSERT INTO `role` (`id`, `name`) VALUES (1, 'ADMIN');
INSERT INTO `role` (`id`, `name`) VALUES (2, 'USER');

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (1, 2);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (2, 2);

INSERT INTO `item` (`id`, `created_date`, `modifed_date`, `name`) VALUES (1,'2020-03-04 06:28:22.622876',null,'Rice');
INSERT INTO `item` (`id`, `created_date`, `modifed_date`, `name`) VALUES (2,'2020-03-04 06:28:22.721094',null,'Black Coffe');
INSERT INTO `item` (`id`, `created_date`, `modifed_date`, `name`) VALUES (3,'2020-03-04 06:28:22.745350',null,'Milk Coffe sachet');
INSERT INTO `item` (`id`, `created_date`, `modifed_date`, `name`) VALUES (4,'2020-03-04 06:28:22.759108',null,'Energen cocolate sachet');
INSERT INTO `item` (`id`, `created_date`, `modifed_date`, `name`) VALUES (5,'2020-03-04 06:28:22.771703',null,'Cooking Oil');


INSERT INTO `unit` (`id`, `created_date`, `modifed_date`, `name`, `description`) VALUES (1,'2020-03-04 06:28:22.783967',null,'Kg','Kilogram');
INSERT INTO `unit` (`id`, `created_date`, `modifed_date`, `name`, `description`) VALUES (2,'2020-03-04 06:28:22.797425',null,'g','gram');
INSERT INTO `unit` (`id`, `created_date`, `modifed_date`, `name`, `description`) VALUES (3,'2020-03-04 06:28:22.810497',null,'Pack','Package');
INSERT INTO `unit` (`id`, `created_date`, `modifed_date`, `name`, `description`) VALUES (4,'2020-03-04 06:28:22.823586',null,'Pcs','Pieces');
INSERT INTO `unit` (`id`, `created_date`, `modifed_date`, `name`, `description`) VALUES (5,'2020-03-04 06:28:22.837036',null,'L','Liter');

INSERT INTO `stock` (`id`, `created_date`, `modifed_date`, `quantity`, `item_id`, `unit_id`) VALUES (1,'2020-03-04 06:28:22.850387',NULL,12,1,1);
INSERT INTO `stock` (`id`, `created_date`, `modifed_date`, `quantity`, `item_id`, `unit_id`) VALUES (2,'2020-03-04 06:28:23.000454',NULL,50,2,2);
INSERT INTO `stock` (`id`, `created_date`, `modifed_date`, `quantity`, `item_id`, `unit_id`) VALUES (3,'2020-03-04 06:28:23.044857',NULL,4,3,3);
INSERT INTO `stock` (`id`, `created_date`, `modifed_date`, `quantity`, `item_id`, `unit_id`) VALUES (4,'2020-03-04 06:28:23.089598',NULL,40,4,4);
INSERT INTO `stock` (`id`, `created_date`, `modifed_date`, `quantity`, `item_id`, `unit_id`) VALUES (5,'2020-03-04 06:28:23.127669',NULL,15,5,5);

INSERT INTO `transaction` (`id`, `amount`, `type`, `created_date`, `modifed_date`, `description`) VALUES (1,25000,'OUT','2020-03-13 02:32:42.683545',NULL,'Purchases Detol soap 6 Pcs');
INSERT INTO `transaction` (`id`, `amount`, `type`, `created_date`, `modifed_date`, `description`) VALUES (2,50000,'OUT','2020-03-13 02:40:24.063395',NULL,'Purchases Milk Coffe 40 Sachet');
INSERT INTO `transaction` (`id`, `amount`, `type`, `created_date`, `modifed_date`, `description`) VALUES (3,500000,'IN','2020-03-03 10:00:20.103948',NULL,'for purchasing stock items');
INSERT INTO `transaction` (`id`, `amount`, `type`, `created_date`, `modifed_date`, `description`) VALUES (4,400000,'IN','2020-03-23 09:22:20.103948',NULL,'for purchasing stock items');
INSERT INTO `transaction` (`id`, `amount`, `type`, `created_date`, `modifed_date`, `description`) VALUES (5,1000000,'IN','2020-04-03 10:30:20.103948',NULL,'for purchasing stock items');
