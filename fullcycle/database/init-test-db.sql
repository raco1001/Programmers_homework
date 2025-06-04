LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1, 'test@example.com', 'test');
UNLOCK TABLES;

-- 
-- Dumping data for table `notes`
-- 

LOCK TABLES `notes` WRITE;

INSERT INTO `notes` 
VALUES (1, 'Test (1)', '<p>This is a test note.</p>', 1, NOW(), NOW());

UNLOCK TABLES;