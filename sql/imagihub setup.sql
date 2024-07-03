create schema if not exists `imagihub_anon_v1`;
use `imagihub_anon_v1`;

drop table if exists `images`;
CREATE TABLE `images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `i_name` varchar(50) NOT NULL ,
  `i_affix` varchar(10) NOT NULL,
  `i_ext` varchar(5) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  UNIQUE KEY `i_affix` (`i_affix`)
) ;

drop view if exists `images_with_dir`;
CREATE VIEW `images_with_dir` AS
SELECT id_image, i_name, i_affix, i_ext,
       concat(i_name, '_', i_affix, '.', i_ext) AS i_dir,
       created_at, id_user
FROM images;


DROP PROCEDURE IF EXISTS `new_image`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_image`(
	i_name varchar(50), ext text
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      ROLLBACK;
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred';
    END;

    START TRANSACTION;
    set @rr = rand() * 5;
    set @ii = uuid();
    set @tmp_id = left(substr(@ii,@rr),4);
	insert into imagihub_anon_v1.images (i_name,i_affix,i_ext)
    values(
		i_name, 
		 @tmp_id
         ,ext
    );
    SET @id = LAST_INSERT_ID();
    select concat(i_name,".",i_ext) as name,i_dir as dir,i_affix as id from images_with_dir where id_image = @id;
    
    commit;
END$$
DELIMITER ;

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'imagihub'@'localhost';
GRANT USAGE ON *.* TO 'imagihub'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON imagihub_anon_v1.* TO 'imagihub'@'localhost';
GRANT EXECUTE ON PROCEDURE imagihub_anon_v1.new_image TO 'imagihub'@'localhost';
FLUSH PRIVILEGES;
