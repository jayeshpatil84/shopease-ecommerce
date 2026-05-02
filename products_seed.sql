USE ecommerce_db;

-- Clear existing products first
DELETE FROM order_items;
DELETE FROM cart_items;
DELETE FROM orders;
DELETE FROM products;

-- Add categories if not exist
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Electronics', 'Phones, Laptops, Gadgets'),
(2, 'Clothing', 'Fashion and Apparel'),
(3, 'Books', 'Fiction and Non-Fiction'),
(4, 'Home & Kitchen', 'Furniture and Appliances'),
(5, 'Sports', 'Fitness and Outdoor gear'),
(6, 'Grocery', 'Food and Daily essentials');

INSERT INTO products (active, brand, description, image_url, name, price, stock, category_id, created_at) VALUES

-- ========== ELECTRONICS ==========
(1, 'Apple', 'Apple iPhone 14 with A15 Bionic chip, 6.1-inch Super Retina XDR display, 12MP camera system and all-day battery life.',
'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?w=400', 'iPhone 14', 79999, 10, 1, NOW()),

(1, 'Samsung', 'Samsung Galaxy S23 with Snapdragon 8 Gen 2, 50MP triple camera, 6.1-inch Dynamic AMOLED 2X display.',
'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?w=400', 'Samsung Galaxy S23', 74999, 12, 1, NOW()),

(1, 'Dell', 'Dell XPS 13 ultrabook with Intel Core i7, 16GB RAM, 512GB SSD, 13.4-inch FHD+ display.',
'https://images.pexels.com/photos/18105/pexels-photo.jpg?w=400', 'Dell XPS 13 Laptop', 95000, 8, 1, NOW()),

(1, 'Apple', 'MacBook Air M2 with Apple Silicon chip, 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD.',
'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?w=400', 'MacBook Air M2', 114900, 6, 1, NOW()),

(1, 'Sony', 'Sony WH-1000XM5 industry-leading noise cancelling wireless headphones with 30-hour battery.',
'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=400', 'Sony WH-1000XM5 Headphones', 26990, 15, 1, NOW()),

(1, 'boAt', 'boAt Rockerz 450 Bluetooth on-ear headphones with 15 hours playback and deep bass.',
'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=400', 'boAt Rockerz 450', 1499, 40, 1, NOW()),

(1, 'Apple', 'Apple iPad 10th Gen with A14 Bionic chip, 10.9-inch Liquid Retina display, Wi-Fi 6.',
'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?w=400', 'Apple iPad 10th Gen', 44900, 10, 1, NOW()),

(1, 'Canon', 'Canon EOS 1500D DSLR camera with 24.1MP APS-C sensor, built-in Wi-Fi and Full HD video.',
'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?w=400', 'Canon EOS 1500D Camera', 34995, 7, 1, NOW()),

(1, 'Samsung', 'Samsung 55-inch 4K UHD Smart TV with Crystal Display, HDR10+, and built-in Alexa.',
'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?w=400', 'Samsung 55" 4K Smart TV', 54990, 5, 1, NOW()),

(1, 'Logitech', 'Logitech MX Master 3 advanced wireless mouse with ultra-fast MagSpeed scrolling.',
'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?w=400', 'Logitech MX Master 3 Mouse', 8995, 20, 1, NOW()),

-- ========== CLOTHING ==========
(1, 'Zara', 'Premium cotton casual round-neck t-shirt. Comfortable fit for everyday wear.',
'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?w=400', 'Men Casual T-Shirt', 799, 50, 2, NOW()),

(1, 'H&M', 'Stylish floral summer dress with breathable fabric. Perfect for casual outings.',
'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=400', 'Women Floral Dress', 1599, 30, 2, NOW()),

(1, 'Levi\'s', 'Levi\'s 511 slim fit jeans in dark wash denim. Classic 5-pocket styling.',
'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=400', 'Levi\'s 511 Slim Jeans', 3299, 25, 2, NOW()),

(1, 'Nike', 'Nike Dri-FIT running jacket with moisture-wicking fabric and zippered pockets.',
'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=400', 'Nike Running Jacket', 4999, 18, 2, NOW()),

(1, 'Allen Solly', 'Allen Solly formal slim-fit shirt. Perfect for office and semi-formal occasions.',
'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=400', 'Allen Solly Formal Shirt', 1299, 35, 2, NOW()),

(1, 'Adidas', 'Adidas Ultraboost 22 running shoes with Boost cushioning and Primeknit upper.',
'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400', 'Adidas Ultraboost 22', 12999, 15, 2, NOW()),

-- ========== BOOKS ==========
(1, 'Penguin', 'James Clear\'s #1 New York Times bestseller on building good habits and breaking bad ones.',
'https://images.pexels.com/photos/1420709/pexels-photo-1420709.jpeg?w=400', 'Atomic Habits', 499, 60, 3, NOW()),

(1, 'Rupa Publications', 'Robert Kiyosaki\'s classic guide to financial literacy and building wealth.',
'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=400', 'Rich Dad Poor Dad', 399, 50, 3, NOW()),

(1, 'HarperCollins', 'Deep Work by Cal Newport - rules for focused success in a distracted world.',
'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?w=400', 'Deep Work - Cal Newport', 449, 40, 3, NOW()),

(1, 'Simon & Schuster', 'The Psychology of Money by Morgan Housel - timeless lessons on wealth and happiness.',
'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?w=400', 'The Psychology of Money', 429, 45, 3, NOW()),

(1, 'Disha Publication', 'Complete guide to crack placement exams - Data Structures and Algorithms in Java.',
'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?w=400', 'DSA in Java - Placement Guide', 599, 30, 3, NOW()),

-- ========== HOME & KITCHEN ==========
(1, 'Philips', 'Philips HL7756 mixer grinder with 750W motor, 3 jars and stainless steel blades.',
'https://images.pexels.com/photos/3765869/pexels-photo-3765869.jpeg?w=400', 'Philips Mixer Grinder 750W', 3499, 15, 4, NOW()),

(1, 'Prestige', 'Prestige pressure cooker 5L with aluminium body and safety valve.',
'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?w=400', 'Prestige Pressure Cooker 5L', 1299, 20, 4, NOW()),

(1, 'IKEA', 'IKEA 3-seater fabric sofa in modern design. Comfortable and durable for living room.',
'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?w=400', 'IKEA 3-Seater Sofa', 27999, 4, 4, NOW()),

(1, 'Milton', 'Milton Thermosteel flask 1 litre - keeps beverages hot for 24 hours, cold for 48 hours.',
'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?w=400', 'Milton Thermosteel Flask 1L', 899, 35, 4, NOW()),

(1, 'Bajaj', 'Bajaj Majesty DX4 1000W room heater with 2 heat settings and overheat protection.',
'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?w=400', 'Bajaj Room Heater 1000W', 1799, 12, 4, NOW()),

(1, 'Cello', 'Cello non-stick cookware set of 5 pieces with bakelite handles and scratch-resistant coating.',
'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?w=400', 'Non-Stick Cookware Set 5pc', 2199, 18, 4, NOW()),

-- ========== SPORTS ==========
(1, 'SG', 'SG RSD Xtreme Grade 1 English Willow cricket bat for professional players.',
'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?w=400', 'SG English Willow Cricket Bat', 4999, 12, 5, NOW()),

(1, 'Nike', 'Nike Pitch Training football - FIFA Basic approved, machine stitched, size 5.',
'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?w=400', 'Nike Pitch Football Size 5', 1499, 25, 5, NOW()),

(1, 'Yonex', 'Yonex GR 303 aluminium badminton racket set with 2 rackets and 3 shuttlecocks.',
'https://images.pexels.com/photos/8007089/pexels-photo-8007089.jpeg?w=400', 'Yonex Badminton Racket Set', 799, 30, 5, NOW()),

(1, 'Boldfit', 'Boldfit yoga mat 6mm thick with non-slip surface, carrying strap included.',
'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?w=400', 'Boldfit Yoga Mat 6mm', 699, 40, 5, NOW()),

(1, 'Nivia', 'Nivia 20kg adjustable dumbbell set with chrome-plated plates and rubber grip.',
'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?w=400', 'Nivia Dumbbell Set 20kg', 2499, 10, 5, NOW()),

(1, 'Cosco', 'Cosco table tennis set with 2 rackets, 3 balls and a portable net clamp.',
'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg?w=400', 'Cosco Table Tennis Set', 1199, 20, 5, NOW()),

-- ========== GROCERY ==========
(1, 'India Gate', 'India Gate Basmati Rice 5kg - premium long grain aged rice with natural aroma.',
'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400', 'India Gate Basmati Rice 5kg', 650, 50, 6, NOW()),

(1, 'Tata', 'Tata Sampann Toor Dal 1kg - unpolished high protein arhar dal.',
'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?w=400', 'Tata Sampann Toor Dal 1kg', 165, 70, 6, NOW()),

(1, 'Amul', 'Amul Pure Ghee 1L - made from fresh cream with natural aroma and taste.',
'https://images.pexels.com/photos/4553031/pexels-photo-4553031.jpeg?w=400', 'Amul Pure Ghee 1L', 550, 45, 6, NOW()),

(1, 'Aashirvaad', 'Aashirvaad Whole Wheat Atta 10kg - made from whole wheat grains.',
'https://images.pexels.com/photos/3737577/pexels-photo-3737577.jpeg?w=400', 'Aashirvaad Whole Wheat Atta 10kg', 420, 40, 6, NOW()),

(1, 'Tata', 'Tata Tea Gold 500g - blend of fine Assam tea leaves with natural fresh aroma.',
'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?w=400', 'Tata Tea Gold 500g', 280, 60, 6, NOW()),

(1, 'Nescafe', 'Nescafe Classic Instant Coffee 200g jar - rich aroma, full-bodied taste.',
'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400', 'Nescafe Classic Coffee 200g', 420, 55, 6, NOW());

SELECT COUNT(*) as total_products FROM products;
