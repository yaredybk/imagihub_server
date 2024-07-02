create schema if not exists `imagihub_anon_v1`;
use `imagihub_anon_v1`;

drop table if exists `images`;
CREATE TABLE `images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `i_name` varchar(35) NOT NULL ,
  `i_affix` varchar(10) NOT NULL,
  `i_ext` varchar(5) NOT NULL,
  `i_dir` varchar(52) GENERATED ALWAYS AS (concat(`i_name`,_utf8mb4'_',`i_affix`,_utf8mb4'.',`i_ext`)) VIRTUAL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  UNIQUE KEY `i_dir` (`i_dir`)
) ;


DROP PROCEDURE IF EXISTS `new_image`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_image`(
	i_name varchar(15), ext text
)
BEGIN
    select max(id_image) from imagihub_anon_v1.images into @id_p;
    set @rr = rand() * 5;
    set @ii = uuid();
    set @tmp_id = left(substr(@ii,@rr),4);
	insert into imagihub_anon_v1.images (i_name,i_affix,i_ext)
    values(
		i_name, 
		 @tmp_id
         ,ext
    );
    select last_insert_id()  into @id;
    if (@id > @id_p ) then select concat(i_name,".",i_ext) as name,i_dir as dir,i_affix as id from images where id_image = @id;
    end if;
    
END$$
DELIMITER ;
