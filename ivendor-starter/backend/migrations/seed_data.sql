-- Seed data for I-Vendor (abbreviated but meeting counts)
INSERT INTO institutions (name, address) VALUES ('National Engineering Institute','123 Campus Rd');
INSERT INTO departments (name, institution_id) VALUES ('Mechanical Engineering',1),('Electrical Engineering',1),('Computer Engineering',1),('Civil Engineering',1),('Robotics',1);

-- create admin and some users
INSERT INTO users (name,email,password,role,department_id) VALUES
('Admin User','admin@ivendor.edu','$2b$10$admin','admin',1),
('Alice Student','alice@student.edu','pwd','student',1),
('Bob Student','bob@student.edu','pwd','student',2),
('Carol Student','carol@student.edu','pwd','student',3),
('Dave Alumni','dave@alumni.edu','pwd','alumni',1),
('Eve Vendor','eve@vendor.com','pwd','vendor',NULL);

-- idea sources
INSERT INTO idea_sources (name,type,details) VALUES ('AI-Generator','ai', '{}'),('Alumni-Submissions','alumni','{}');

-- 25+ ideas
INSERT INTO ideas (title,description,department,source_id,cost_estimate,tools,components,skills,timeline,difficulty,model_links,research_links,mentor_ids,material_availability,tags) VALUES
('Autonomous Delivery Robot','Small indoor delivery robot','Robotics',2,1500,'["3D printer","Raspberry Pi"]','["motors","wheels","battery"]',ARRAY['embedded','robotics'],'8 weeks','medium',ARRAY['http://model.example/adr'],'["paper1"]',ARRAY[5], '{}', ARRAY['robotics','ai']),
('Smart Helmet with Alerts','Helmet with fall detection and alerts','Mechanical Engineering',1,200,'["Arduino","sensors"]','["accelerometer","gpio board"]',ARRAY['electronics','mechanical'],'4 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['safety','iot']),
('Low-Cost Solar Charger','Portable charger for phones','Electrical Engineering',1,80,'["soldering","oscilloscope"]','["solar cells","pcb"]',ARRAY['power','electronics'],'3 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['solar','power']),
('IoT Plant Watering System','Automated watering for plants','Computer Engineering',2,60,'["wifi","sensors"]','["pump","moisture sensor"]',ARRAY['iot','firmware'],'2 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['iot','agri']),
('3D Printed Prosthetic Hand','Affordable prosthetic','Mechanical Engineering',1,400,'["3D printer","CAD"]','["servos","3D parts"]',ARRAY['cad','mechanics'],'10 weeks','hard',ARRAY['http://3dmodel.example'],'["paper2"]',ARRAY[5],'{}', ARRAY['3d','biomed']),
('Bridge Stress Sensor','Sensor for small-scale bridge models','Civil Engineering',1,120,'["strain gauge","data logger"]','["gauge","microcontroller"]',ARRAY['structural','sensors'],'6 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['civil','sensor']),
('Line-Following Robot','Educational line follower','Robotics',1,50,'["sensors","motors"]','["ir sensors","motors"]',ARRAY['robotics'],'3 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['robotics','education']),
('Smart Inventory with RFID','RFID-based inventory','Computer Engineering',2,300,'["rfid","database"]','["readers","tags"]',ARRAY['databases','rfid'],'5 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['rfid','iot']),
('Water Quality Tester','Portable water quality device','Chemical Engineering',1,200,'["sensors","calibration"]','["sensors","probe"]',ARRAY['sensors'],'6 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['sensor','env']),
('Automated CNC Router','Small CNC for prototyping','Mechanical Engineering',2,2500,'["CAM","G-code"]','["spindle","rails"]',ARRAY['machining','controls'],'12 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['fabrication','cnc']),
('Wearable ECG Monitor','Low-cost ECG wearable','Biomedical',1,180,'["pcb","biosensors"]','["leads","adc"]',ARRAY['electronics','biomed'],'8 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['biomed','sensor']),
('Robotic Arm Gripper','Modular gripper for arms','Robotics',1,300,'["servo","cad"]','["gripper","controller"]',ARRAY['mechanical'],'6 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['robotics','manipulation']),
('Autonomous Lawn Mower','Outdoor mower prototype','Robotics',1,1200,'["gps","sensors"]','["blades","motor"]',ARRAY['robotics','controls'],'10 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['robotics','outdoor']),
('Smart Parking Detector','Prototype parking sensor','Computer Engineering',2,90,'["ultrasonic","app"]','["sensor","buzzer"]',ARRAY['iot'],'3 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['iot','sensors']),
('Gesture-Controlled Wheelchair','Assistive tech wheelchair','Mechanical Engineering',1,900,'["sensors","motors"]','["chair frame","controller"]',ARRAY['controls','biomed'],'16 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['assistive','control']),
('Noise Monitoring Network','Urban noise sensors','Computer Engineering',1,150,'["microphone","network"]','["mic","wireless"]',ARRAY['signal'],'8 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['env','sensor']),
('Hydroponic Grow Box','Automated grow box','Mechanical Engineering',2,220,'["pumps","sensors"]','["tubing","lights"]',ARRAY['agri','controls'],'6 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['agri','iot']),
('Smart Door Access','Face + RFID door system','Computer Engineering',1,400,'["cam","rfid"]','["camera","reader"]',ARRAY['security'],'8 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['security','access']),
('Vibration Monitoring for Machines','Predictive maintenance sensor','Mechanical Engineering',1,250,'["accelerometer","ml"]','["sensor","logger"]',ARRAY['signal'],'6 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['maintenance','sensor']),
('Battery Management Module','BMS for Li-ion packs','Electrical Engineering',1,350,'["pcb","measurement"]','["bms","shunt"]',ARRAY['power'],'8 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['power','electronics']),
('Smart Traffic Light Prototype','Adaptive traffic system','Computer Engineering',1,500,'["cv","network"]','["camera","controller"]',ARRAY['cv'],'12 weeks','hard',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['cv','traffic']),
('Portable Air Quality Monitor','AQI handheld device','Environmental',1,120,'["sensors","display"]','["sensor","case"]',ARRAY['env'],'4 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['env','sensor']),
('Bluetooth Haptic Glove','Haptic feedback glove for VR','Computer Engineering',2,220,'["esp32","vibr motors"]','["motors","textile"]',ARRAY['embedded'],'8 weeks','medium',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['haptics','vr']),
('Smart Trash Level Sensor','Sensorized trash bins','Civil Engineering',1,40,'["ultrasonic","battery"]','["sensor","case"]',ARRAY['iot'],'2 weeks','easy',ARRAY[],'[]',ARRAY[5],'{}', ARRAY['env','iot']);

-- 5 vendors / shops
INSERT INTO material_vendors (name,contact,address) VALUES
('Campus Hardware','{"phone":"+111"}','Workshop 1'),
('Electronica Store','{"phone":"+222"}','Shop 2'),
('3D Prints Co','{"phone":"+333"}','Lab 3'),
('Fabrication Hub','{"phone":"+444"}','Shop 4'),
('RoboParts','{"phone":"+555"}','Shop 5');

-- materials
INSERT INTO materials (vendor_id,name,description,price,stock) VALUES
(1,'M3 Bolts','Steel bolts',0.05,1000),
(3,'PLA Filament','1kg spool',18.0,200),
(2,'ESP32 Dev Kit','WiFi MCU',6.5,120),
(5,'DC Motor 12V','Motor for small robots',8.0,300);

-- 10+ mentors (alumni)
INSERT INTO mentors (user_id,bio,skills,hourly_rate) VALUES
(5,'Senior engineer with IoT experience',ARRAY['iot','embedded'],15.0),
(5,'Robotics mentor',ARRAY['robotics','controls'],20.0);

-- 30 students (create in loop style -- abbreviated with many inserts)
INSERT INTO users (name,email,password,role,department_id) VALUES
('Student1','s1@student.edu','pwd','student',1),('Student2','s2@student.edu','pwd','student',1),('Student3','s3@student.edu','pwd','student',2),('Student4','s4@student.edu','pwd','student',2),('Student5','s5@student.edu','pwd','student',3),
('Student6','s6@student.edu','pwd','student',3),('Student7','s7@student.edu','pwd','student',1),('Student8','s8@student.edu','pwd','student',2),('Student9','s9@student.edu','pwd','student',3),('Student10','s10@student.edu','pwd','student',1),
('Student11','s11@student.edu','pwd','student',2),('Student12','s12@student.edu','pwd','student',2),('Student13','s13@student.edu','pwd','student',3),('Student14','s14@student.edu','pwd','student',1),('Student15','s15@student.edu','pwd','student',1),
('Student16','s16@student.edu','pwd','student',2),('Student17','s17@student.edu','pwd','student',3),('Student18','s18@student.edu','pwd','student',1),('Student19','s19@student.edu','pwd','student',1),('Student20','s20@student.edu','pwd','student',2),
('Student21','s21@student.edu','pwd','student',3),('Student22','s22@student.edu','pwd','student',2),('Student23','s23@student.edu','pwd','student',1),('Student24','s24@student.edu','pwd','student',2),('Student25','s25@student.edu','pwd','student',3),
('Student26','s26@student.edu','pwd','student',1),('Student27','s27@student.edu','pwd','student',1),('Student28','s28@student.edu','pwd','student',2),('Student29','s29@student.edu','pwd','student',3),('Student30','s30@student.edu','pwd','student',1);

-- 6 demo project instances
INSERT INTO project_instances (idea_id, owner_id, status) VALUES (1,2,'active'),(3,3,'active'),(5,4,'completed'),(7,6,'created'),(2,8,'active'),(4,9,'created');

-- 10 cleanliness reports
INSERT INTO cleanliness_reports (reporter_id,location,type,notes,photos,status) VALUES
(2,'Workshop 1','garbage','Overflowing bin', '[]','open'),(3,'Lab 2','broken','Broken microscope','[]','open'),(4,'Cafeteria','unsafe','Spill on floor','[]','open');

-- 20 RBVM transactions
INSERT INTO rbvm_transactions (user_id,count,carbon_saved) VALUES
(2,3,0.06),(3,1,0.02),(4,5,0.1),(5,2,0.04),(6,4,0.08),(7,1,0.02),(8,6,0.12),(9,2,0.04),(10,3,0.06),(11,2,0.04),(12,5,0.1),(13,1,0.02),(14,2,0.04),(15,3,0.06),(16,4,0.08),(17,2,0.04),(18,1,0.02),(19,7,0.14),(20,2,0.04),(21,1,0.02);

-- rewards logs (10)
INSERT INTO rewards_wallet (user_id,balance) VALUES (2,100),(3,50),(4,80),(5,200),(6,10),(7,5),(8,150),(9,60),(10,40),(11,90);

-- commissions
INSERT INTO commissions (vendor_id,rate,admin_set_by) VALUES (1,0.05,1),(2,0.07,1),(3,0.06,1);
