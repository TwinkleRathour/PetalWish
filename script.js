/* ==========================================================================
   PETALWISH — ONLINE GREETING & INVITATION DESIGN PLATFORM
   Vanilla JavaScript Application Engine
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. TEMPLATES REGISTRY (32 Professionally Designed Compositions)
  // --------------------------------------------------------------------------
  const INITIAL_TEMPLATES = [
    // HOUSEWARMING & BIRTHDAY ARTISTIC SERIES (INSPIRED BY PAPERLESS POST / GREETINGS ISLAND)
    {
      id: 'birthday-zoe-13',
      title: 'Zoe Turns 13 Invite',
      category: 'Birthday',
      style: 'Modern',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['birthday', 'zoe', '13', 'pink', 'celebrate'],
      bg: { type: 'solid', value: '#FFF0F2' },
      elements: [
        { id: 'el-zoe-t1', type: 'text', content: 'COME CELEBRATE!', fontSize: 14, fontFamily: 'Outfit', fontWeight: '700', color: '#C04E68', letterSpacing: 2, textAlign: 'center', x: 40, y: 80, width: 420, height: 30, rotation: 0 },
        { id: 'el-zoe-t2', type: 'text', content: 'ZOE TURNS 13', fontSize: 32, fontFamily: 'Playfair Display', fontWeight: '900', color: '#C04E68', textAlign: 'center', x: 40, y: 140, width: 420, height: 60, rotation: 0 },
        { id: 'el-zoe-t3', type: 'text', content: 'AT NAVY PIER\nRSVP 212-4484344', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', color: '#C04E68', letterSpacing: 1, lineHeight: 1.6, textAlign: 'center', x: 40, y: 220, width: 420, height: 50, rotation: 0 },
        { id: 'el-zoe-t4', type: 'text', content: 'HBD', fontSize: 14, fontFamily: 'Outfit', fontWeight: '700', color: '#C04E68', textAlign: 'center', x: 40, y: 300, width: 420, height: 30, rotation: 0 }
      ]
    },
    {
      id: 'birthday-teacup',
      title: 'Sweet Sips & Cakes',
      category: 'Birthday',
      style: 'Editorial',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['sweet', 'sips', 'cake', 'teacup', 'birthday', 'pastel'],
      bg: { type: 'solid', value: '#FAF6F0' },
      elements: [
        { id: 'el-tea-svg', type: 'shape', shapeType: 'teacup-cake', x: 150, y: 30, width: 200, height: 170, rotation: 0 },
        { id: 'el-tea-t1', type: 'text', content: 'come celebrate', fontSize: 13, fontFamily: 'Playfair Display', fontWeight: '400', fontStyle: 'italic', color: '#E88D96', letterSpacing: 2, textAlign: 'center', x: 40, y: 215, width: 420, height: 30, rotation: 0 },
        { id: 'el-tea-t2', type: 'text', content: 'Marsha\'s\n21st Birthday\nBash', fontSize: 32, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#D87882', letterSpacing: 0, lineHeight: 1.15, textAlign: 'center', x: 40, y: 245, width: 420, height: 110, rotation: 0 },
        { id: 'el-tea-line', type: 'shape', shapeType: 'line', x: 200, y: 370, width: 100, height: 2, stroke: '#E88D96', strokeWidth: 1, fill: 'none', rotation: 0 },
        { id: 'el-tea-t3', type: 'text', content: 'ON FRIDAY, OCTOBER 18 AT 8:00 PM\n1617 ARROW ST., STRATTON', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', color: '#6E6A67', letterSpacing: 1.5, lineHeight: 1.7, textAlign: 'center', x: 40, y: 400, width: 420, height: 50, rotation: 0 },
        { id: 'el-tea-t4', type: 'text', content: 'RSVP TO CHRISTY • 987-654-3210', fontSize: 11, fontFamily: 'Outfit', fontWeight: '600', color: '#E88D96', letterSpacing: 2, textAlign: 'center', x: 40, y: 520, width: 420, height: 30, rotation: 0 }
      ]
    },
    {
      id: 'housewarming-door',
      title: 'Floral Door Housewarming',
      category: 'Party',
      style: 'Botanical',
      color: 'Blue',
      orientation: 'Portrait',
      tags: ['floral', 'door', 'housewarming', 'keys', 'memories'],
      bg: { type: 'solid', value: '#FAF4ED' },
      elements: [
        { id: 'el-door-svg', type: 'shape', shapeType: 'floral-door', x: 150, y: 30, width: 200, height: 250, rotation: 0 },
        { id: 'el-door-t1', type: 'text', content: 'NEW KEYS  •  NEW MEMORIES', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#5C5856', letterSpacing: 3, textAlign: 'center', x: 40, y: 290, width: 420, height: 30, rotation: 0 },
        { id: 'el-door-t2', type: 'text', content: 'Aurora & Isaac', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '400', fontStyle: 'italic', color: '#2C2A29', letterSpacing: 0, textAlign: 'center', x: 40, y: 325, width: 420, height: 60, rotation: 0 },
        { id: 'el-door-line', type: 'shape', shapeType: 'line', x: 200, y: 395, width: 100, height: 2, stroke: '#5A8F69', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-door-t3', type: 'text', content: 'INVITE YOU TO A\nHOUSEWARMING CELEBRATION', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#5C5856', letterSpacing: 2.5, lineHeight: 1.8, textAlign: 'center', x: 40, y: 415, width: 420, height: 50, rotation: 0 },
        { id: 'el-door-t4', type: 'text', content: 'SAT | 5.16.26 | NOON\n839 RED HAWK ROAD, CEDAR CITY', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', color: '#6E6A67', letterSpacing: 1.5, lineHeight: 1.6, textAlign: 'center', x: 40, y: 510, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'housewarming-coffee',
      title: 'Cheeky Morning Breakfast',
      category: 'Party',
      style: 'Minimal',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['breakfast', 'coffee', 'moka', 'housewarming', 'cheeky'],
      bg: { type: 'solid', value: '#FFF9F2' },
      elements: [
        { id: 'el-coffee-t1', type: 'text', content: 'please gather with us at a celebratory', fontSize: 13, fontFamily: 'Playfair Display', fontWeight: '400', fontStyle: 'italic', color: '#6E6A67', letterSpacing: 1, textAlign: 'center', x: 40, y: 60, width: 420, height: 30, rotation: 0 },
        { id: 'el-coffee-t2', type: 'text', content: 'BREAKFAST\nHOUSEWARMING', fontSize: 26, fontFamily: 'Outfit', fontWeight: '700', color: '#2C2A29', letterSpacing: 2, lineHeight: 1.25, textAlign: 'center', x: 40, y: 95, width: 420, height: 75, rotation: 0 },
        { id: 'el-coffee-svg', type: 'shape', shapeType: 'coffee-croissant', x: 150, y: 180, width: 200, height: 160, rotation: 0 },
        { id: 'el-coffee-line', type: 'shape', shapeType: 'line', x: 200, y: 350, width: 100, height: 2, stroke: '#2C2A29', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-coffee-t3', type: 'text', content: 'SAT  •  SEPT 19  •  10AM', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#2C2A29', letterSpacing: 2, textAlign: 'center', x: 40, y: 370, width: 420, height: 30, rotation: 0 },
        { id: 'el-coffee-t4', type: 'text', content: 'hosted by The Fergusons\n112 Haverhill Drive, Maryland\nrespond to dina at 123.456.7890', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', color: '#5C5856', lineHeight: 1.8, textAlign: 'center', x: 40, y: 410, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'housewarming-dinner',
      title: 'Dinner Is Served',
      category: 'Party',
      style: 'Modern',
      color: 'Multicolor',
      orientation: 'Portrait',
      tags: ['dinner', 'served', 'feast', 'wine', 'housewarming'],
      bg: { type: 'solid', value: '#F8F3EC' },
      elements: [
        { id: 'el-feast-t1', type: 'text', content: 'COME ON OVER FOR', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#5A8F69', letterSpacing: 3, textAlign: 'center', x: 40, y: 60, width: 420, height: 30, rotation: 0 },
        { id: 'el-feast-t2', type: 'text', content: 'GOOD FOOD\n&\nGOOD TIMES!', fontSize: 26, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#D87882', letterSpacing: 1, lineHeight: 1.2, textAlign: 'center', x: 40, y: 95, width: 420, height: 95, rotation: 0 },
        { id: 'el-feast-svg', type: 'shape', shapeType: 'feast-table', x: 150, y: 200, width: 200, height: 170, rotation: 0 },
        { id: 'el-feast-t3', type: 'text', content: 'AT\nJohn & Shari\'s\nHOUSEWARMING PARTY', fontSize: 12, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#2C2A29', letterSpacing: 1, lineHeight: 1.4, textAlign: 'center', x: 40, y: 255, width: 420, height: 60, rotation: 0 },
        { id: 'el-feast-t4', type: 'text', content: 'JULY 16 AT 6PM\n853 WOLF RIDGE DRIVE, SAUSALITO', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#5C5856', letterSpacing: 1.5, lineHeight: 1.7, textAlign: 'center', x: 40, y: 395, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'birthday-floral',
      title: 'Garden Birthday Party',
      category: 'Birthday',
      style: 'Botanical',
      color: 'Purple',
      orientation: 'Portrait',
      tags: ['floral', 'botanical', 'birthday', 'purple', 'garden'],
      bg: { type: 'gradient', color1: '#E8DDFF', color2: '#FFF0F5' },
      elements: [
        { id: 'el-b3-wreath', type: 'shape', shapeType: 'botanical-wreath', x: 150, y: 30, width: 200, height: 200, rotation: 0 },
        { id: 'el-b3-t1', type: 'text', content: 'PLEASE JOIN US FOR A', fontSize: 11, fontFamily: 'Outfit', fontWeight: '600', color: '#5A3F80', letterSpacing: 3, textAlign: 'center', x: 40, y: 240, width: 420, height: 25, rotation: 0 },
        { id: 'el-b3-t2', type: 'text', content: 'Garden Birthday', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#2B1A4A', textAlign: 'center', x: 40, y: 270, width: 420, height: 65, rotation: 0 },
        { id: 'el-b3-t3', type: 'text', content: 'HONORING SOPHIA', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#7C5CFC', letterSpacing: 3, textAlign: 'center', x: 40, y: 345, width: 420, height: 28, rotation: 0 },
        { id: 'el-b3-line', type: 'shape', shapeType: 'line', x: 200, y: 385, width: 100, height: 2, stroke: '#7C5CFC', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-b3-t4', type: 'text', content: 'Sunday, June 14th at 2:00 PM\nThe Rose Pavilion Gardens', fontSize: 14, fontFamily: 'Playfair Display', fontWeight: '400', fontStyle: 'italic', color: '#4B3F50', lineHeight: 1.8, textAlign: 'center', x: 40, y: 410, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'birthday-pastel',
      title: 'Sweet Treats & Party',
      category: 'Birthday',
      style: 'Modern',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['sweet', 'treats', 'birthday', 'party', 'fun', 'pastel'],
      bg: { type: 'gradient', color1: '#FFD3E8', color2: '#FFECE6' },
      elements: [
        { id: 'el-b4-cake', type: 'shape', shapeType: 'teacup-cake', x: 150, y: 40, width: 200, height: 170, rotation: 0 },
        { id: 'el-b4-t1', type: 'text', content: 'LET\'S CELEBRATE', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#D83872', letterSpacing: 4, textAlign: 'center', x: 40, y: 230, width: 420, height: 28, rotation: 0 },
        { id: 'el-b4-t2', type: 'text', content: 'Julian Is\nTurning 25!', fontSize: 38, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#6A1030', lineHeight: 1.15, textAlign: 'center', x: 40, y: 265, width: 420, height: 100, rotation: 0 },
        { id: 'el-b4-line', type: 'shape', shapeType: 'line', x: 200, y: 380, width: 100, height: 2, stroke: '#D83872', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-b4-t3', type: 'text', content: 'OCTOBER 28 | 9 PM TILL LATE\nTHE SKYLINE LOUNGE', fontSize: 13, fontFamily: 'Outfit', fontWeight: '600', color: '#4A2A38', letterSpacing: 1.5, lineHeight: 1.6, textAlign: 'center', x: 40, y: 410, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'birthday-luxury',
      title: 'Luxury Gold Birthday Gala',
      category: 'Birthday',
      style: 'Luxury',
      color: 'Black',
      orientation: 'Portrait',
      tags: ['luxury', 'black', 'gold', 'birthday', 'gala'],
      bg: { type: 'gradient', color1: '#1F1B18', color2: '#3D352F' },
      elements: [
        { id: 'el-b5-frame', type: 'shape', shapeType: 'border', x: 25, y: 25, width: 450, height: 650, stroke: '#D4AF37', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-b5-glasses', type: 'shape', shapeType: 'champagne-glasses', x: 150, y: 50, width: 200, height: 220, rotation: 0 },
        { id: 'el-b5-t1', type: 'text', content: 'EXCLUSIVE INVITATION', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#D4AF37', letterSpacing: 4, textAlign: 'center', x: 40, y: 290, width: 420, height: 28, rotation: 0 },
        { id: 'el-b5-t2', type: 'text', content: 'Golden Gala', fontSize: 46, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#FFFFFF', textAlign: 'center', x: 40, y: 325, width: 420, height: 70, rotation: 0 },
        { id: 'el-b5-t3', type: 'text', content: 'CELEBRATING MARCUS\'S 40TH', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#D4AF37', letterSpacing: 3, textAlign: 'center', x: 40, y: 410, width: 420, height: 28, rotation: 0 },
        { id: 'el-b5-line', type: 'shape', shapeType: 'line', x: 200, y: 450, width: 100, height: 1, stroke: '#D4AF37', strokeWidth: 1, fill: 'none', rotation: 0 },
        { id: 'el-b5-t4', type: 'text', content: 'SATURDAY, NOV 14 AT 8:00 PM\nTHE RITZ CARLTON BALLROOM', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', color: '#E8E4DF', letterSpacing: 2, lineHeight: 1.8, textAlign: 'center', x: 40, y: 475, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'birthday-modern',
      title: 'Chic Morning Birthday Brunch',
      category: 'Birthday',
      style: 'Modern',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['brunch', 'morning', 'birthday', 'coffee'],
      bg: { type: 'gradient', color1: '#FFE6D5', color2: '#FFF5EE' },
      elements: [
        { id: 'el-b6-coffee', type: 'shape', shapeType: 'coffee-croissant', x: 100, y: 45, width: 300, height: 180, rotation: 0 },
        { id: 'el-b6-t1', type: 'text', content: 'CELEBRATE WITH US', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#E88D96', letterSpacing: 4, textAlign: 'center', x: 40, y: 245, width: 420, height: 28, rotation: 0 },
        { id: 'el-b6-t2', type: 'text', content: 'Emily\'s 21st', fontSize: 46, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#5C3A21', textAlign: 'center', x: 40, y: 280, width: 420, height: 70, rotation: 0 },
        { id: 'el-b6-line', type: 'shape', shapeType: 'line', x: 200, y: 365, width: 100, height: 2, stroke: '#7C5CFC', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-b6-t3', type: 'text', content: 'FRIDAY, AUGUST 7 • 9 PM\nCLUB LUNA, SOHO', fontSize: 13, fontFamily: 'Outfit', fontWeight: '600', color: '#2C2A29', letterSpacing: 1.5, lineHeight: 1.6, textAlign: 'center', x: 40, y: 395, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'birthday-photo',
      title: 'Fun Balloon First Birthday',
      category: 'Birthday',
      style: 'Modern',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['balloons', 'first', 'birthday', 'party'],
      bg: { type: 'gradient', color1: '#FFDCE4', color2: '#FFF0F2' },
      elements: [
        { id: 'el-b7-balloons', type: 'shape', shapeType: 'balloon-arch', x: 100, y: 35, width: 300, height: 200, rotation: 0 },
        { id: 'el-b7-t1', type: 'text', content: 'ONE YEAR OF WONDER', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#D83872', letterSpacing: 3, textAlign: 'center', x: 40, y: 250, width: 420, height: 28, rotation: 0 },
        { id: 'el-b7-t2', type: 'text', content: 'Lucas Turns 1', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#4A1025', textAlign: 'center', x: 40, y: 285, width: 420, height: 65, rotation: 0 },
        { id: 'el-b7-line', type: 'shape', shapeType: 'line', x: 200, y: 360, width: 100, height: 2, stroke: '#D83872', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-b7-t3', type: 'text', content: 'SUNDAY, SEPT 20 | 4 PM\n14 WEST RIDGE ROAD', fontSize: 13, fontFamily: 'Inter', fontWeight: '500', color: '#5C5856', letterSpacing: 1.5, lineHeight: 1.7, textAlign: 'center', x: 40, y: 385, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'birthday-kids',
      title: 'Cheerful Kids Birthday',
      category: 'Birthday',
      style: 'Modern',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['kids', 'birthday', 'cheerful', 'pastel'],
      bg: { type: 'gradient', color1: '#FFEAF2', color2: '#FFF5F8' },
      elements: [
        { id: 'el-b8-hat', type: 'shape', shapeType: 'birthday-hat', x: 130, y: 40, width: 240, height: 220, rotation: 0 },
        { id: 'el-b8-t1', type: 'text', content: 'IT\'S PARTY TIME!', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#7C5CFC', letterSpacing: 3, textAlign: 'center', x: 40, y: 275, width: 420, height: 28, rotation: 0 },
        { id: 'el-b8-t2', type: 'text', content: 'Oliver\'s 1st', fontSize: 38, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#2B1A4A', textAlign: 'center', x: 40, y: 310, width: 420, height: 65, rotation: 0 },
        { id: 'el-b8-t3', type: 'text', content: 'SATURDAY, MAY 2 • 3:00 PM\nSUNNY PARK PAVILION', fontSize: 13, fontFamily: 'Outfit', fontWeight: '600', color: '#5C5856', letterSpacing: 1, lineHeight: 1.6, textAlign: 'center', x: 40, y: 385, width: 420, height: 50, rotation: 0 }
      ]
    },

    // WEDDING (6)
    {
      id: 'wedding-rebecca-eli',
      title: 'Rebecca & Eli Save the Date',
      category: 'Wedding',
      style: 'Elegant',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['wedding', 'save the date', 'rebecca', 'eli', 'photo', 'pink'],
      bg: { type: 'solid', value: '#FFF0F2' },
      elements: [
        { id: 'el-w-re-t1', type: 'text', content: 'SAVE the DATE', fontSize: 16, fontFamily: 'Outfit', fontWeight: '700', color: '#C04E68', letterSpacing: 3, textAlign: 'center', x: 40, y: 180, width: 420, height: 30, rotation: 0 },
        { id: 'el-w-re-t2', type: 'text', content: 'REBECCA & ELI', fontSize: 26, fontFamily: 'Playfair Display', fontWeight: '700', color: '#C04E68', textAlign: 'center', x: 40, y: 220, width: 420, height: 40, rotation: 0 },
        { id: 'el-w-re-t3', type: 'text', content: 'OCTOBER 19, 2027 • SAN DIEGO\nformal invitation to follow', fontSize: 12, fontFamily: 'Inter', fontWeight: '500', color: '#C04E68', letterSpacing: 1, lineHeight: 1.6, textAlign: 'center', x: 40, y: 280, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'wedding-lena-theo',
      title: 'Lena & Theo Wedding Invitation',
      category: 'Wedding',
      style: 'Elegant',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['wedding', 'invitation', 'lena', 'theo', 'pink'],
      bg: { type: 'solid', value: '#FFFFFF' },
      elements: [
        { id: 'el-w-lt-t1', type: 'text', content: 'WITH JOY, YOU ARE INVITED TO\nTHE WEDDING OF', fontSize: 12, fontFamily: 'Outfit', fontWeight: '600', color: '#8C2D3A', letterSpacing: 2, lineHeight: 1.5, textAlign: 'center', x: 40, y: 80, width: 420, height: 40, rotation: 0 },
        { id: 'el-w-lt-t2', type: 'text', content: 'Lena & Theo', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#8C2D3A', textAlign: 'center', x: 40, y: 140, width: 420, height: 60, rotation: 0 },
        { id: 'el-w-lt-t3', type: 'text', content: 'SATURDAY, AUGUST 15, 2026\nAT 5 O\'CLOCK IN THE EVENING\nMAGNOLIA WEDDING ESTATE\nATLANTA, GEORGIA', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#8C2D3A', letterSpacing: 1, lineHeight: 1.8, textAlign: 'center', x: 40, y: 220, width: 420, height: 100, rotation: 0 },
        { id: 'el-w-lt-t4', type: 'text', content: 'RECEPTION TO FOLLOW', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#8C2D3A', letterSpacing: 2, textAlign: 'center', x: 40, y: 340, width: 420, height: 30, rotation: 0 }
      ]
    },
    {
      id: 'wedding-botanical',
      title: 'Ring Ceremony Invitation',
      category: 'Wedding',
      style: 'Elegant',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['wedding', 'rings', 'gold', 'elegant'],
      bg: { type: 'gradient', color1: '#EAF6EC', color2: '#F4FAF6' },
      elements: [
        { id: 'el-w1-rings', type: 'shape', shapeType: 'wedding-rings', x: 140, y: 40, width: 220, height: 180, rotation: 0 },
        { id: 'el-w1-t1', type: 'text', content: 'TOGETHER WITH THEIR FAMILIES', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#2E5A39', letterSpacing: 3, textAlign: 'center', x: 40, y: 235, width: 420, height: 28, rotation: 0 },
        { id: 'el-w1-t2', type: 'text', content: 'Charlotte & William', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#1B3522', textAlign: 'center', x: 40, y: 270, width: 420, height: 65, rotation: 0 },
        { id: 'el-w1-line', type: 'shape', shapeType: 'line', x: 200, y: 350, width: 100, height: 2, stroke: '#5A8F69', strokeWidth: 1, fill: 'none', rotation: 0 },
        { id: 'el-w1-t4', type: 'text', content: 'SATURDAY, THE FIFTH OF AUGUST\nAT FOUR O\'CLOCK IN THE AFTERNOON', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', color: '#2C2A29', letterSpacing: 1.5, lineHeight: 1.9, textAlign: 'center', x: 40, y: 375, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'wedding-minimal',
      title: 'Floral Arch Save The Date',
      category: 'Wedding',
      style: 'Minimal',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['wedding', 'floral', 'arch', 'save the date'],
      bg: { type: 'gradient', color1: '#FEECE6', color2: '#FFF5F0' },
      elements: [
        { id: 'el-w2-door', type: 'shape', shapeType: 'floral-door', x: 150, y: 30, width: 200, height: 250, rotation: 0 },
        { id: 'el-w2-t1', type: 'text', content: 'SAVE THE DATE', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#C86850', letterSpacing: 5, textAlign: 'center', x: 40, y: 295, width: 420, height: 28, rotation: 0 },
        { id: 'el-w2-t2', type: 'text', content: 'Evelyn + Daniel', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '400', fontStyle: 'italic', color: '#4A1D13', textAlign: 'center', x: 40, y: 330, width: 420, height: 65, rotation: 0 },
        { id: 'el-w2-t3', type: 'text', content: '09 . 18 . 2026', fontSize: 22, fontFamily: 'Outfit', fontWeight: '500', color: '#C86850', letterSpacing: 4, textAlign: 'center', x: 40, y: 410, width: 420, height: 38, rotation: 0 }
      ]
    },
    {
      id: 'wedding-elegant',
      title: 'Elegant Wedding Feast',
      category: 'Wedding',
      style: 'Elegant',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['wedding', 'elegant', 'dinner', 'feast'],
      bg: { type: 'gradient', color1: '#FFEAD5', color2: '#FFFBF7' },
      elements: [
        { id: 'el-w3-feast', type: 'shape', shapeType: 'feast-table', x: 150, y: 40, width: 200, height: 180, rotation: 0 },
        { id: 'el-w3-t1', type: 'text', content: 'Madeline & Alexander', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#5C3E21', textAlign: 'center', x: 40, y: 240, width: 420, height: 60, rotation: 0 },
        { id: 'el-w3-t2', type: 'text', content: 'request the honor of your presence', fontSize: 14, fontFamily: 'Playfair Display', fontWeight: '300', fontStyle: 'italic', color: '#8A6D51', textAlign: 'center', x: 40, y: 310, width: 420, height: 30, rotation: 0 },
        { id: 'el-w3-t3', type: 'text', content: 'SATURDAY, OCTOBER 10, 2026\nAT FIVE O\'CLOCK IN THE EVENING', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', color: '#2C2A29', letterSpacing: 2, lineHeight: 1.8, textAlign: 'center', x: 40, y: 350, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'wedding-luxury',
      title: 'Luxury Gold Foil Wedding',
      category: 'Wedding',
      style: 'Luxury',
      color: 'Black',
      orientation: 'Portrait',
      tags: ['wedding', 'luxury', 'black', 'gold'],
      bg: { type: 'gradient', color1: '#1A1817', color2: '#2D2826' },
      elements: [
        { id: 'el-w4-border', type: 'shape', shapeType: 'border', x: 25, y: 25, width: 450, height: 650, stroke: '#E8A9C1', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-w4-envelope', type: 'shape', shapeType: 'envelope-seal', x: 120, y: 50, width: 260, height: 200, rotation: 0 },
        { id: 'el-w4-t1', type: 'text', content: 'THE WEDDING OF', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#E8A9C1', letterSpacing: 5, textAlign: 'center', x: 40, y: 275, width: 420, height: 28, rotation: 0 },
        { id: 'el-w4-t2', type: 'text', content: 'Victoria & Gabriel', fontSize: 42, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#FFFFFF', textAlign: 'center', x: 40, y: 310, width: 420, height: 65, rotation: 0 },
        { id: 'el-w4-t3', type: 'text', content: 'JUNE 20, 2026 • 4:00 PM\nTHE PLAZA HOTEL, NEW YORK', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', color: '#E8E4DF', letterSpacing: 2, lineHeight: 1.8, textAlign: 'center', x: 40, y: 395, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'wedding-floral',
      title: 'Romantic Heart Wedding',
      category: 'Wedding',
      style: 'Floral',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['wedding', 'heart', 'pink', 'romantic'],
      bg: { type: 'gradient', color1: '#FFDCE0', color2: '#FFF0F2' },
      elements: [
        { id: 'el-w5-heart', type: 'shape', shapeType: 'heart-vines', x: 140, y: 40, width: 220, height: 200, rotation: 0 },
        { id: 'el-w5-t1', type: 'text', content: 'FOREVER BEGINS NOW', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#D8386A', letterSpacing: 4, textAlign: 'center', x: 40, y: 260, width: 420, height: 28, rotation: 0 },
        { id: 'el-w5-t2', type: 'text', content: 'Isabella & Theodore', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#4A1020', textAlign: 'center', x: 40, y: 295, width: 420, height: 60, rotation: 0 },
        { id: 'el-w5-t3', type: 'text', content: 'SEPTEMBER 12, 2026 • 3:30 PM\nMAGNOLIA GARDENS ESTATE', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', color: '#5C5856', letterSpacing: 2, lineHeight: 1.8, textAlign: 'center', x: 40, y: 375, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'wedding-modern',
      title: 'Morning Brunch Wedding',
      category: 'Wedding',
      style: 'Modern',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['wedding', 'brunch', 'modern', 'morning', 'coffee'],
      bg: { type: 'gradient', color1: '#FFE6CC', color2: '#FFF5EB' },
      elements: [
        { id: 'el-w6-coffee', type: 'shape', shapeType: 'coffee-croissant', x: 100, y: 40, width: 300, height: 170, rotation: 0 },
        { id: 'el-w6-t1', type: 'text', content: 'WE ARE GETTING MARRIED', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#8A5C2E', letterSpacing: 3, textAlign: 'center', x: 40, y: 230, width: 420, height: 28, rotation: 0 },
        { id: 'el-w6-t2', type: 'text', content: 'Hannah + Ethan', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#7C5CFC', textAlign: 'center', x: 40, y: 265, width: 420, height: 65, rotation: 0 },
        { id: 'el-w6-t3', type: 'text', content: '11 . 07 . 2026', fontSize: 22, fontFamily: 'Outfit', fontWeight: '600', color: '#5C3E21', letterSpacing: 3, textAlign: 'center', x: 40, y: 345, width: 420, height: 38, rotation: 0 }
      ]
    },

    // BABY SHOWER (4)
    {
      id: 'baby-little-honey',
      title: 'A Little Honey Baby Shower',
      category: 'Baby & Kids',
      style: 'Modern',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['baby', 'shower', 'honey', 'bee'],
      bg: { type: 'solid', value: '#FFFFFF' },
      elements: [
        { id: 'el-b-lh-t1', type: 'text', content: 'let\'s celebrate!', fontSize: 12, fontFamily: 'Outfit', fontWeight: '600', color: '#6D541D', letterSpacing: 2, textAlign: 'center', x: 40, y: 70, width: 420, height: 30, rotation: 0 },
        { id: 'el-b-lh-t2', type: 'text', content: 'a little honey', fontSize: 34, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#6D541D', textAlign: 'center', x: 40, y: 110, width: 420, height: 50, rotation: 0 },
        { id: 'el-b-lh-t3', type: 'text', content: 'is on the way?', fontSize: 16, fontFamily: 'Outfit', fontWeight: '500', color: '#6D541D', textAlign: 'center', x: 40, y: 170, width: 420, height: 30, rotation: 0 },
        { id: 'el-b-lh-t4', type: 'text', content: 'JESSIE\'S BABY SHOWER\nSAT | AUGUST 15 | 2PM\n38 parkside drive, fresno\nrsvp to: dbaker@gmail.com\nregistered at target', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#6D541D', letterSpacing: 0.5, lineHeight: 1.6, textAlign: 'center', x: 40, y: 220, width: 420, height: 120, rotation: 0 }
      ]
    },
    {
      id: 'baby-gender-reveal',
      title: 'Gender Reveal Invitation',
      category: 'Baby & Kids',
      style: 'Modern',
      color: 'Multicolor',
      orientation: 'Portrait',
      tags: ['baby', 'shower', 'gender reveal', 'reveal'],
      bg: { type: 'solid', value: '#FFFFFF' },
      elements: [
        { id: 'el-b-gr-t1', type: 'text', content: 'what will baby francis be?', fontSize: 14, fontFamily: 'Outfit', fontWeight: '600', color: '#006064', letterSpacing: 1, textAlign: 'center', x: 40, y: 60, width: 420, height: 30, rotation: 0 },
        { id: 'el-b-gr-t2', type: 'text', content: 'JOIN US FOR A\ngender reveal party!', fontSize: 24, fontFamily: 'Playfair Display', fontWeight: '700', color: '#006064', lineHeight: 1.3, textAlign: 'center', x: 40, y: 110, width: 420, height: 70, rotation: 0 },
        { id: 'el-b-gr-t3', type: 'text', content: 'FOR Baby Francis', fontSize: 14, fontFamily: 'Outfit', fontWeight: '600', color: '#006064', textAlign: 'center', x: 40, y: 190, width: 420, height: 30, rotation: 0 },
        { id: 'el-b-gr-t4', type: 'text', content: 'SEP 25 | 2026\n23251 winwood drive\nclaremont, california\nregrets only to sarah\n616-254-8672', fontSize: 11, fontFamily: 'Inter', fontWeight: '500', color: '#006064', lineHeight: 1.6, textAlign: 'center', x: 40, y: 230, width: 420, height: 100, rotation: 0 }
      ]
    },
    {
      id: 'baby-neutral',
      title: 'Moon & Stars Baby Shower',
      category: 'Baby & Kids',
      style: 'Modern',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['baby', 'shower', 'moon', 'stars'],
      bg: { type: 'gradient', color1: '#D6EFFF', color2: '#FFF0F5' },
      elements: [
        { id: 'el-bb1-moon', type: 'shape', shapeType: 'moon-stars', x: 120, y: 40, width: 260, height: 220, rotation: 0 },
        { id: 'el-bb1-t1', type: 'text', content: 'WELCOME LITTLE ONE', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#3A7F85', letterSpacing: 4, textAlign: 'center', x: 40, y: 280, width: 420, height: 28, rotation: 0 },
        { id: 'el-bb1-t2', type: 'text', content: 'Baby Shower', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#1B3C40', textAlign: 'center', x: 40, y: 315, width: 420, height: 70, rotation: 0 },
        { id: 'el-bb1-t3', type: 'text', content: 'HONORING EMMA MILLER', fontSize: 12, fontFamily: 'Outfit', fontWeight: '600', color: '#3A7F85', letterSpacing: 2, textAlign: 'center', x: 40, y: 395, width: 420, height: 28, rotation: 0 }
      ]
    },
    {
      id: 'baby-floral',
      title: 'Sweet Baby Girl Shower',
      category: 'Baby & Kids',
      style: 'Floral',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['baby', 'shower', 'floral', 'girl', 'pink'],
      bg: { type: 'gradient', color1: '#FFD3E2', color2: '#FFF5F7' },
      elements: [
        { id: 'el-bb2-cake', type: 'shape', shapeType: 'teacup-cake', x: 150, y: 40, width: 200, height: 170, rotation: 0 },
        { id: 'el-bb2-t1', type: 'text', content: 'OH BABY!', fontSize: 14, fontFamily: 'Outfit', fontWeight: '700', color: '#D83872', letterSpacing: 5, textAlign: 'center', x: 40, y: 230, width: 420, height: 30, rotation: 0 },
        { id: 'el-bb2-t2', type: 'text', content: 'Celebrating\nBaby Girl', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#6A1030', lineHeight: 1.2, textAlign: 'center', x: 40, y: 265, width: 420, height: 95, rotation: 0 }
      ]
    },
    {
      id: 'baby-minimal',
      title: 'Minimalist Stork Announcement',
      category: 'Baby & Kids',
      style: 'Minimal',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['baby', 'announcement', 'stork'],
      bg: { type: 'gradient', color1: '#E6E6FA', color2: '#FFF0F5' },
      elements: [
        { id: 'el-bb3-stork', type: 'shape', shapeType: 'stork', x: 130, y: 40, width: 240, height: 220, rotation: 0 },
        { id: 'el-bb3-t1', type: 'text', content: 'HEAVEN SENT', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#7C5CFC', letterSpacing: 4, textAlign: 'center', x: 40, y: 275, width: 420, height: 28, rotation: 0 },
        { id: 'el-bb3-t2', type: 'text', content: 'Liam James', fontSize: 48, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#2B1A4A', textAlign: 'center', x: 40, y: 310, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'baby-announcement',
      title: 'Baby Mobile Announcement',
      category: 'Baby & Kids',
      style: 'Modern',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['baby', 'announcement', 'mobile'],
      bg: { type: 'gradient', color1: '#E2F3E6', color2: '#F4FAF6' },
      elements: [
        { id: 'el-bb4-mobile', type: 'shape', shapeType: 'baby-mobile', x: 110, y: 40, width: 280, height: 220, rotation: 0 },
        { id: 'el-bb4-t1', type: 'text', content: 'INTRODUCING OUR SON', fontSize: 11, fontFamily: 'Outfit', fontWeight: '700', color: '#3E7B4A', letterSpacing: 3, textAlign: 'center', x: 40, y: 280, width: 420, height: 28, rotation: 0 },
        { id: 'el-bb4-t2', type: 'text', content: 'Noah Alexander', fontSize: 38, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#1B3520', textAlign: 'center', x: 40, y: 315, width: 420, height: 60, rotation: 0 }
      ]
    },

    // GRADUATION (4)
    {
      id: 'grad-modern',
      title: 'Graduation Feast Celebration',
      category: 'Party',
      style: 'Modern',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['graduation', 'dinner', 'modern', 'feast'],
      bg: { type: 'gradient', color1: '#E6F0E9', color2: '#FAFDFB' },
      elements: [
        { id: 'el-g1-feast', type: 'shape', shapeType: 'feast-table', x: 150, y: 40, width: 200, height: 175, rotation: 0 },
        { id: 'el-g1-t1', type: 'text', content: 'CLASS OF 2026', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#3E7B4A', letterSpacing: 5, textAlign: 'center', x: 40, y: 230, width: 420, height: 28, rotation: 0 },
        { id: 'el-g1-t2', type: 'text', content: 'GRADUATION', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#1B3520', textAlign: 'center', x: 40, y: 265, width: 420, height: 70, rotation: 0 },
        { id: 'el-g1-t3', type: 'text', content: 'HONORING BENJAMIN CARTER', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#3E7B4A', letterSpacing: 2, textAlign: 'center', x: 40, y: 350, width: 420, height: 28, rotation: 0 }
      ]
    },
    {
      id: 'grad-elegant',
      title: 'Elegant Cap Graduation',
      category: 'Party',
      style: 'Elegant',
      color: 'Black',
      orientation: 'Portrait',
      tags: ['graduation', 'elegant', 'black', 'mortarboard'],
      bg: { type: 'gradient', color1: '#1F1916', color2: '#3D312B' },
      elements: [
        { id: 'el-g2-border', type: 'shape', shapeType: 'border', x: 25, y: 25, width: 450, height: 650, stroke: '#E8A9C1', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-g2-cap', type: 'shape', shapeType: 'mortarboard', x: 120, y: 50, width: 260, height: 220, rotation: 0 },
        { id: 'el-g2-t1', type: 'text', content: 'THE GRADUATE', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#E8A9C1', letterSpacing: 4, textAlign: 'center', x: 40, y: 290, width: 420, height: 28, rotation: 0 },
        { id: 'el-g2-t2', type: 'text', content: 'Samantha Hayes', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#FFFFFF', textAlign: 'center', x: 40, y: 325, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'grad-photo',
      title: 'Brunch Graduation Celebration',
      category: 'Party',
      style: 'Editorial',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['graduation', 'brunch', 'celebration', 'coffee'],
      bg: { type: 'gradient', color1: '#FFE6CC', color2: '#FFF5EB' },
      elements: [
        { id: 'el-g3-coffee', type: 'shape', shapeType: 'coffee-croissant', x: 100, y: 40, width: 300, height: 175, rotation: 0 },
        { id: 'el-g3-t1', type: 'text', content: 'SHE DID IT!', fontSize: 14, fontFamily: 'Outfit', fontWeight: '700', color: '#7C5CFC', letterSpacing: 4, textAlign: 'center', x: 40, y: 230, width: 420, height: 30, rotation: 0 },
        { id: 'el-g3-t2', type: 'text', content: 'Chloe Vance, B.A.', fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#2B1A4A', textAlign: 'center', x: 40, y: 265, width: 420, height: 60, rotation: 0 }
      ]
    },
    {
      id: 'grad-minimal',
      title: 'Garden Graduation Party',
      category: 'Party',
      style: 'Minimal',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['graduation', 'botanical', 'garden', 'party'],
      bg: { type: 'gradient', color1: '#E2F3E6', color2: '#F4FAF6' },
      elements: [
        { id: 'el-g4-door', type: 'shape', shapeType: 'floral-door', x: 150, y: 30, width: 200, height: 250, rotation: 0 },
        { id: 'el-g4-t1', type: 'text', content: 'COLLEGE GRADUATION', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#3E7B4A', letterSpacing: 4, textAlign: 'center', x: 40, y: 295, width: 420, height: 28, rotation: 0 },
        { id: 'el-g4-t2', type: 'text', content: 'Class of 2026', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#1B3520', textAlign: 'center', x: 40, y: 330, width: 420, height: 70, rotation: 0 }
      ]
    },

    // ANNIVERSARY (3)
    {
      id: 'anniv-elegant',
      title: 'Anniversary Wine Dinner',
      category: 'Party',
      style: 'Elegant',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['anniversary', 'elegant', 'wine', 'dinner'],
      bg: { type: 'gradient', color1: '#FFEAD5', color2: '#FFF5EE' },
      elements: [
        { id: 'el-a1-wine', type: 'shape', shapeType: 'wine-glass', x: 150, y: 40, width: 200, height: 220, rotation: 0 },
        { id: 'el-a1-t1', type: 'text', content: 'CELEBRATING 25 YEARS', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#C88B50', letterSpacing: 4, textAlign: 'center', x: 40, y: 275, width: 420, height: 28, rotation: 0 },
        { id: 'el-a1-t2', type: 'text', content: 'David & Rachel', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#4A2A10', textAlign: 'center', x: 40, y: 310, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'anniv-modern',
      title: 'Still In Love Anniversary',
      category: 'Party',
      style: 'Modern',
      color: 'Pink',
      orientation: 'Portrait',
      tags: ['anniversary', 'modern', 'love', 'cake'],
      bg: { type: 'gradient', color1: '#FFD3E8', color2: '#FFECE6' },
      elements: [
        { id: 'el-a2-cake', type: 'shape', shapeType: 'teacup-cake', x: 150, y: 40, width: 200, height: 165, rotation: 0 },
        { id: 'el-a2-t1', type: 'text', content: 'CHEERS TO 10 YEARS', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#D83872', letterSpacing: 3, textAlign: 'center', x: 40, y: 220, width: 420, height: 28, rotation: 0 },
        { id: 'el-a2-t2', type: 'text', content: 'STILL IN LOVE', fontSize: 40, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#6A1030', textAlign: 'center', x: 40, y: 255, width: 420, height: 65, rotation: 0 }
      ]
    },
    {
      id: 'anniv-minimal',
      title: '50 Golden Years',
      category: 'Party',
      style: 'Minimal',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['anniversary', 'golden', 'milestone', 'wreath'],
      bg: { type: 'gradient', color1: '#FFF0D6', color2: '#FFFDF5' },
      elements: [
        { id: 'el-a3-wreath', type: 'shape', shapeType: 'botanical-wreath', x: 150, y: 30, width: 200, height: 200, rotation: 0 },
        { id: 'el-a3-t1', type: 'text', content: 'ANNIVERSARY CELEBRATION', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#D4AF37', letterSpacing: 4, textAlign: 'center', x: 40, y: 245, width: 420, height: 28, rotation: 0 },
        { id: 'el-a3-t2', type: 'text', content: '50 Golden Years', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#5C4A21', textAlign: 'center', x: 40, y: 280, width: 420, height: 70, rotation: 0 }
      ]
    },

    // OTHER CATEGORIES (7)
    {
      id: 'thankyou-floral',
      title: 'Floral Envelope Thank You',
      category: 'Party',
      style: 'Botanical',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['thank you', 'envelope', 'floral', 'gratitude'],
      bg: { type: 'gradient', color1: '#E2FAF0', color2: '#F4FAF6' },
      elements: [
        { id: 'el-t1-env', type: 'shape', shapeType: 'envelope-seal', x: 120, y: 40, width: 260, height: 200, rotation: 0 },
        { id: 'el-t1-t1', type: 'text', content: 'WITH SINCERE GRATITUDE', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#2E7A4A', letterSpacing: 4, textAlign: 'center', x: 40, y: 260, width: 420, height: 28, rotation: 0 },
        { id: 'el-t1-t2', type: 'text', content: 'Thank You', fontSize: 52, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#1B3520', textAlign: 'center', x: 40, y: 295, width: 420, height: 80, rotation: 0 }
      ]
    },
    {
      id: 'congrats-luxury',
      title: 'Luxury Champagne Celebration',
      category: 'Party',
      style: 'Luxury',
      color: 'Black',
      orientation: 'Portrait',
      tags: ['congratulations', 'luxury', 'champagne', 'gold'],
      bg: { type: 'gradient', color1: '#1F1D1C', color2: '#3D3532' },
      elements: [
        { id: 'el-c1-border', type: 'shape', shapeType: 'border', x: 25, y: 25, width: 450, height: 650, stroke: '#E8A9C1', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-c1-champagne', type: 'shape', shapeType: 'champagne-glasses', x: 150, y: 50, width: 200, height: 220, rotation: 0 },
        { id: 'el-c1-t1', type: 'text', content: 'WARMEST WISHES', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#E8A9C1', letterSpacing: 4, textAlign: 'center', x: 40, y: 285, width: 420, height: 28, rotation: 0 },
        { id: 'el-c1-t2', type: 'text', content: 'Congratulations!', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#FFFFFF', textAlign: 'center', x: 40, y: 320, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'housewarming-modern',
      title: 'Floral Door Housewarming',
      category: 'Party',
      style: 'Botanical',
      color: 'Blue',
      orientation: 'Portrait',
      tags: ['housewarming', 'party', 'door', 'botanical'],
      bg: { type: 'gradient', color1: '#DCEFFF', color2: '#F4F8FA' },
      elements: [
        { id: 'el-h1-door', type: 'shape', shapeType: 'floral-door', x: 150, y: 30, width: 200, height: 250, rotation: 0 },
        { id: 'el-h1-t1', type: 'text', content: 'OUR NEW HOME', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#3A7F9E', letterSpacing: 4, textAlign: 'center', x: 40, y: 295, width: 420, height: 28, rotation: 0 },
        { id: 'el-h1-t2', type: 'text', content: 'Housewarming', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#1B3C4B', textAlign: 'center', x: 40, y: 330, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'dinner-editorial',
      title: 'Autumn Supper Soiree',
      category: 'Party',
      style: 'Editorial',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['dinner', 'supper', 'autumn', 'soiree', 'feast'],
      bg: { type: 'gradient', color1: '#FFEAD5', color2: '#FAF8F3' },
      elements: [
        { id: 'el-d1-feast', type: 'shape', shapeType: 'feast-table', x: 150, y: 35, width: 200, height: 175, rotation: 0 },
        { id: 'el-d1-t1', type: 'text', content: 'YOU ARE CORDIALLY INVITED TO', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', color: '#8A5C2E', letterSpacing: 3, textAlign: 'center', x: 40, y: 225, width: 420, height: 28, rotation: 0 },
        { id: 'el-d1-t2', type: 'text', content: 'An Autumn Supper', fontSize: 44, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#4A2E10', textAlign: 'center', x: 40, y: 260, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'party-cocktail',
      title: 'Cocktail & Bites Evening',
      category: 'Party',
      style: 'Modern',
      color: 'Neutral',
      orientation: 'Portrait',
      tags: ['party', 'cocktail', 'bites', 'evening', 'glasses'],
      bg: { type: 'gradient', color1: '#E8DDFF', color2: '#FFF9F2' },
      elements: [
        { id: 'el-p1-glasses', type: 'shape', shapeType: 'champagne-glasses', x: 150, y: 40, width: 200, height: 220, rotation: 0 },
        { id: 'el-p1-t1', type: 'text', content: 'JOIN US FOR', fontSize: 13, fontFamily: 'Outfit', fontWeight: '700', color: '#7C5CFC', letterSpacing: 4, textAlign: 'center', x: 40, y: 275, width: 420, height: 28, rotation: 0 },
        { id: 'el-p1-t2', type: 'text', content: 'COCKTAILS & BITES', fontSize: 38, fontFamily: 'Outfit', fontWeight: '700', color: '#2B1A4A', letterSpacing: 1, textAlign: 'center', x: 40, y: 310, width: 420, height: 50, rotation: 0 }
      ]
    },
    {
      id: 'holiday-gala',
      title: 'Holiday Feast Celebration',
      category: 'Party',
      style: 'Botanical',
      color: 'Green',
      orientation: 'Portrait',
      tags: ['holiday', 'feast', 'celebration', 'wreath'],
      bg: { type: 'gradient', color1: '#E6F3EA', color2: '#F4FAF6' },
      elements: [
        { id: 'el-hol-wreath', type: 'shape', shapeType: 'botanical-wreath', x: 150, y: 30, width: 200, height: 200, rotation: 0 },
        { id: 'el-hol-t1', type: 'text', content: 'SEASON\'S GREETINGS', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', color: '#3E7B4A', letterSpacing: 4, textAlign: 'center', x: 40, y: 245, width: 420, height: 28, rotation: 0 },
        { id: 'el-hol-t2', type: 'text', content: 'Holiday Soiree', fontSize: 46, fontFamily: 'Playfair Display', fontWeight: '700', fontStyle: 'italic', color: '#1B3520', textAlign: 'center', x: 40, y: 280, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'celestial-gala',
      title: 'Evening Under The Stars',
      category: 'Party',
      style: 'Luxury',
      color: 'Black',
      orientation: 'Portrait',
      tags: ['celestial', 'stars', 'gala', 'evening', 'moon'],
      bg: { type: 'gradient', color1: '#120E1F', color2: '#27203E' },
      elements: [
        { id: 'el-cel-border', type: 'shape', shapeType: 'border', x: 25, y: 25, width: 450, height: 650, stroke: '#E8A9C1', strokeWidth: 1.5, fill: 'none', rotation: 0 },
        { id: 'el-cel-moon', type: 'shape', shapeType: 'moon-stars', x: 120, y: 40, width: 260, height: 220, rotation: 0 },
        { id: 'el-cel-t1', type: 'text', content: 'UNDER THE STARS', fontSize: 12, fontFamily: 'Outfit', fontWeight: '700', color: '#E8A9C1', letterSpacing: 4, textAlign: 'center', x: 40, y: 280, width: 420, height: 28, rotation: 0 },
        { id: 'el-cel-t2', type: 'text', content: 'Celestial Gala', fontSize: 46, fontFamily: 'Playfair Display', fontWeight: '600', fontStyle: 'italic', color: '#FFFFFF', textAlign: 'center', x: 40, y: 315, width: 420, height: 70, rotation: 0 }
      ]
    },
    {
      id: 'back-to-school',
      title: 'Back to School Party',
      category: 'Party',
      style: 'Modern',
      color: 'Blue',
      orientation: 'Portrait',
      tags: ['party', 'back to school', 'school', 'grid'],
      bg: {
        type: 'solid',
        value: '#ECEFF1'
      },
      elements: [
        {
          id: 'el-bts-title',
          type: 'text',
          content: 'BaCk 2 sChOoL PaRtY',
          fontSize: 28,
          fontFamily: 'Playfair Display',
          fontWeight: '700',
          color: '#37474F',
          textAlign: 'center',
          x: 40,
          y: 260,
          width: 420,
          height: 50,
          rotation: 0
        },
        {
          id: 'el-bts-date',
          type: 'text',
          content: 'Sunday\nSEPTEMBER 6TH\nat 1:00 PM',
          fontSize: 16,
          fontFamily: 'Inter',
          fontWeight: '500',
          color: '#37474F',
          textAlign: 'center',
          lineHeight: 1.5,
          x: 40,
          y: 320,
          width: 420,
          height: 90,
          rotation: 0
        },
        {
          id: 'el-bts-location',
          type: 'text',
          content: "JACKSON'S BACKYARD,\n789 GALA LANE",
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: '600',
          color: '#37474F',
          letterSpacing: 1,
          textAlign: 'center',
          lineHeight: 1.5,
          x: 40,
          y: 420,
          width: 420,
          height: 60,
          rotation: 0
        }
      ]
    }
  ];

  // Guest data (not logged in) stays in localStorage; account data lives in the backend (server/)
  const STORAGE_KEYS = {
    FAVORITES: 'petalwish_favorites_v1',
    DESIGNS: 'petalwish_my_designs_v1',
    RSVPS: 'petalwish_rsvps_v1',
    USER: 'petalwish_user_v1'
  };

  // Backend client from api.js (null if that script failed to load)
  const API = window.PetalWishAPI || null;

  // Password of the seeded demo accounts behind the "Continue as demo user" buttons
  const DEMO_PASSWORD = 'petalwish2026';

  function readLocalList(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  // A cached profile only counts as signed in when there is also a backend token
  function readCachedUser() {
    if (!API || !API.getToken()) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      return null;
    }
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
    } catch {
      return null;
    }
  }

  const cachedUser = readCachedUser();

  let state = {
    templates: INITIAL_TEMPLATES,
    templatesSource: 'local', // 'api' once the catalogue has been loaded from MongoDB
    // Signed-in users get their favorites/designs from the API after init
    favorites: cachedUser ? [] : readLocalList(STORAGE_KEYS.FAVORITES),
    myDesigns: cachedUser ? [] : readLocalList(STORAGE_KEYS.DESIGNS),
    user: cachedUser,
    isSavingDesign: false,
    activeView: 'home',
    searchQuery: '',
    selectedCategory: 'All',
    filters: { occasion: 'All', style: 'All', color: 'All', orientation: 'All' },
    activeModalTemplate: null,

    // Active Canvas / Editor State
    editorDesignId: null,
    editorTitle: 'My Custom Design',
    editorBg: { type: 'solid', value: '#FAF8F5' },
    editorElements: [],
    editorSurface: 'front',
    editorSurfaces: {},
    selectedElementId: null,
    zoomLevel: 1,
    historyStack: [],
    redoStack: [],

    // RSVP System Data
    rsvps: JSON.parse(localStorage.getItem(STORAGE_KEYS.RSVPS) || '[]')
  };

  // --------------------------------------------------------------------------
  // 3. DOM ELEMENTS REFERENCE
  // --------------------------------------------------------------------------
  const DOM = {
    // Views
    viewHome: document.getElementById('view-home'),
    viewExplore: document.getElementById('view-explore'),
    viewDashboard: document.getElementById('view-dashboard'),
    viewRsvp: document.getElementById('view-rsvp'),
    viewEditor: document.getElementById('view-editor'),

    // Nav
    navLinks: document.getElementById('nav-links'),
    favCountBadge: document.getElementById('fav-count-badge'),
    hamburgerBtn: document.getElementById('hamburger-btn'),
    mobileMenu: document.getElementById('mobile-menu'),

    // Gallery & Filters
    templateGrid: document.getElementById('template-grid'),
    searchInput: document.getElementById('template-search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    navbarSearchInput: document.getElementById('navbar-search-input'),
    navbarClearSearchBtn: document.getElementById('navbar-clear-search-btn'),
    categoryChips: document.getElementById('category-chips'),
    resultsCountText: document.getElementById('results-count-text'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    emptyResultsState: document.getElementById('empty-results-state'),
    trendingTrack: document.getElementById('trending-track'),

    // Filter dropdowns
    filterOccasion: document.getElementById('filter-occasion'),
    filterStyle: document.getElementById('filter-style'),
    filterColor: document.getElementById('filter-color'),
    filterOrientation: document.getElementById('filter-orientation'),

    // Dashboard
    savedDesignsGrid: document.getElementById('saved-designs-grid'),
    favoritesGrid: document.getElementById('favorites-grid'),
    dashDesignsContainer: document.getElementById('dash-designs-container'),
    dashFavsContainer: document.getElementById('dash-favs-container'),
    emptyDesignsState: document.getElementById('empty-designs-state'),
    emptyFavsState: document.getElementById('empty-favs-state'),
    dashHeading: document.getElementById('dash-heading'),
    dashSubheading: document.getElementById('dash-subheading'),

    // Editor
    editorProjectTitle: document.getElementById('editor-project-title'),
    editorSubpanel: document.getElementById('editor-subpanel'),
    designCanvasWrapper: document.getElementById('design-canvas-wrapper'),
    designCanvas: document.getElementById('design-canvas'),
    propsContent: document.getElementById('props-content'),
    zoomPercentText: document.getElementById('zoom-percent-text'),

    // RSVP
    rsvpTotalVal: document.getElementById('rsvp-total-val'),
    rsvpAcceptVal: document.getElementById('rsvp-accept-val'),
    rsvpMaybeVal: document.getElementById('rsvp-maybe-val'),
    rsvpDeclineVal: document.getElementById('rsvp-decline-val'),
    barAccept: document.getElementById('bar-accept'),
    barMaybe: document.getElementById('bar-maybe'),
    barDecline: document.getElementById('bar-decline'),
    barNumAccept: document.getElementById('bar-num-accept'),
    barNumMaybe: document.getElementById('bar-num-maybe'),
    barNumDecline: document.getElementById('bar-num-decline'),
    guestLogList: document.getElementById('guest-log-list'),

    // Auth & User Profile DOM
    navLoginBtn: document.getElementById('nav-login-btn'),
    userHeaderProfile: document.getElementById('user-header-profile'),
    userAvatarBtn: document.getElementById('user-avatar-btn'),
    userDropdownMenu: document.getElementById('user-dropdown-menu'),
    avatarInitials: document.getElementById('avatar-initials'),
    dropdownUserName: document.getElementById('dropdown-user-name'),
    dropdownUserEmail: document.getElementById('dropdown-user-email'),
    loginModalOverlay: document.getElementById('login-modal-overlay'),
    loginModalClose: document.getElementById('login-modal-close'),
    authForm: document.getElementById('auth-form'),
    authTabLogin: document.getElementById('auth-tab-login'),
    authTabSignup: document.getElementById('auth-tab-signup'),

    // Modals
    templateModalOverlay: document.getElementById('template-modal-overlay'),
    invitationModalOverlay: document.getElementById('invitation-modal-overlay'),
    shareModalOverlay: document.getElementById('share-modal-overlay'),
    toastContainer: document.getElementById('toast-container')
  };

  // --------------------------------------------------------------------------
  // 4. TEMPLATE PREVIEW & CANVAS RENDER ENGINE
  // --------------------------------------------------------------------------

  // Render SVG Vector Elements for Preview and Editor Surface
  function renderSvgElement(el) {
    if (el.shapeType === 'circle') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><circle cx="50" cy="50" r="48" fill="${el.fill || 'none'}" stroke="${el.stroke || '#2C2A29'}" stroke-width="${el.strokeWidth || 2}"/></svg>`;
    }
    if (el.shapeType === 'rect') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><rect width="100" height="100" fill="${el.fill || 'none'}" stroke="${el.stroke || '#2C2A29'}" stroke-width="${el.strokeWidth || 2}"/></svg>`;
    }
    if (el.shapeType === 'arch') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 150" preserveAspectRatio="none"><path d="M0,50 A50,50 0 0,1 100,50 L100,150 L0,150 Z" fill="${el.fill || 'none'}" stroke="${el.stroke || '#2C2A29'}" stroke-width="${el.strokeWidth || 2}"/></svg>`;
    }
    if (el.shapeType === 'border') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="2" y="2" width="96" height="96" fill="${el.fill || 'none'}" stroke="${el.stroke || '#2C2A29'}" stroke-width="${el.strokeWidth || 2}"/></svg>`;
    }
    if (el.shapeType === 'floral') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="${el.fill || '#7C5CFC'}"><path d="M50,10 C55,30 75,30 80,50 C75,70 55,70 50,90 C45,70 25,70 20,50 C25,30 45,30 50,10 Z"/></svg>`;
    }
    if (el.shapeType === 'star') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="${el.fill || '#E8A9C1'}"><polygon points="50,5 64,36 98,39 72,61 80,95 50,77 20,95 28,61 2,39 36,36"/></svg>`;
    }
    if (el.shapeType === 'blob') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="${el.fill || '#E8E3F5'}"><path d="M30,10 Q70,5 85,35 T60,85 T15,65 Z"/></svg>`;
    }
    if (el.shapeType === 'line') {
      return `<svg width="100%" height="100%" viewBox="0 0 100 2" preserveAspectRatio="none"><line x1="0" y1="1" x2="100" y2="1" stroke="${el.stroke || '#2C2A29'}" stroke-width="${el.strokeWidth || 2}"/></svg>`;
    }
    if (el.shapeType === 'floral-door') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Door Frame -->
        <rect x="50" y="70" width="100" height="180" rx="4" fill="#6A9AB0" stroke="#3A6B82" stroke-width="3"/>
        <line x1="100" y1="70" x2="100" y2="250" stroke="#3A6B82" stroke-width="2"/>
        <circle cx="90" cy="160" r="4" fill="#D4AF37"/>
        <circle cx="110" cy="160" r="4" fill="#D4AF37"/>
        <path d="M40,250 L160,250 L150,270 L50,270 Z" fill="#D5C5B5"/>
        <!-- Floral Archway Vines -->
        <path d="M20,250 C20,100 60,30 100,30 C140,30 180,100 180,250" stroke="#5A8F69" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M25,240 C25,110 65,40 100,40 C135,40 175,110 175,240" stroke="#7CB08B" stroke-width="6" stroke-linecap="round" fill="none"/>
        <!-- Pink Blossoms -->
        <circle cx="35" cy="180" r="8" fill="#E88D96"/><circle cx="45" cy="130" r="9" fill="#E8A9C1"/><circle cx="65" cy="70" r="10" fill="#E88D96"/>
        <circle cx="100" cy="30" r="11" fill="#E8A9C1"/><circle cx="135" cy="70" r="10" fill="#E88D96"/><circle cx="155" cy="130" r="9" fill="#E8A9C1"/>
        <circle cx="165" cy="180" r="8" fill="#E88D96"/><circle cx="55" cy="210" r="7" fill="#F4DFC8"/><circle cx="145" cy="210" r="7" fill="#F4DFC8"/>
      </svg>`;
    }
    if (el.shapeType === 'teacup-cake') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Pink Cake Stand -->
        <ellipse cx="100" cy="130" rx="60" ry="12" fill="#E88D96"/>
        <path d="M90,130 L95,170 L105,170 L110,130 Z" fill="#E88D96"/>
        <ellipse cx="100" cy="170" rx="30" ry="6" fill="#D87882"/>
        <!-- Cake -->
        <rect x="60" y="80" width="80" height="48" rx="6" fill="#FFF5F7" stroke="#E88D96" stroke-width="2"/>
        <path d="M60,95 Q70,105 80,95 T100,95 T120,95 T140,95 L140,80 L60,80 Z" fill="#E8A9C1"/>
        <circle cx="80" cy="74" r="6" fill="#E88D96"/><circle cx="100" cy="72" r="7" fill="#7C5CFC"/><circle cx="120" cy="74" r="6" fill="#E88D96"/>
        <!-- Teacup -->
        <path d="M140,150 C140,170 170,170 170,150 Z" fill="#FFFFFF" stroke="#7C5CFC" stroke-width="2"/>
        <path d="M170,152 C178,152 178,164 170,164" stroke="#7C5CFC" stroke-width="2" fill="none"/>
        <ellipse cx="155" cy="170" rx="20" ry="4" fill="#E8E3F5" stroke="#7C5CFC" stroke-width="1.5"/>
      </svg>`;
    }
    if (el.shapeType === 'coffee-croissant') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Line Art Moka Pot & Coffee -->
        <path d="M40,120 L48,50 L72,50 L80,120 Z" stroke="#2C2A29" stroke-width="2.5" fill="none"/>
        <path d="M45,85 L75,85" stroke="#2C2A29" stroke-width="2"/>
        <path d="M48,50 L60,35 L72,50 Z" stroke="#2C2A29" stroke-width="2" fill="none"/>
        <circle cx="60" cy="30" r="3" fill="#2C2A29"/>
        <path d="M72,65 C85,65 85,95 72,95" stroke="#2C2A29" stroke-width="2.5" fill="none"/>
        <!-- Coffee Cup -->
        <path d="M110,90 C110,120 145,120 145,90 Z" stroke="#2C2A29" stroke-width="2.5" fill="#FFFFFF"/>
        <ellipse cx="127.5" cy="90" rx="17.5" ry="5" stroke="#2C2A29" stroke-width="2" fill="#D5C5B5"/>
        <ellipse cx="127.5" cy="122" rx="25" ry="5" stroke="#2C2A29" stroke-width="2" fill="none"/>
        <!-- Croissant -->
        <path d="M150,55 C165,45 185,55 180,70 C175,85 155,80 150,55 Z" stroke="#2C2A29" stroke-width="2" fill="#F4DFC8"/>
      </svg>`;
    }
    if (el.shapeType === 'feast-table') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Oval Framed Badge -->
        <ellipse cx="100" cy="100" rx="85" ry="65" fill="#FFFFFF" stroke="#4A7C59" stroke-width="3"/>
        <ellipse cx="100" cy="100" rx="79" ry="59" fill="none" stroke="#E8A9C1" stroke-width="1.5" stroke-dasharray="4 3"/>
        <!-- Wine & Grapes Accent -->
        <path d="M35,60 L40,30 L45,30 L50,60 L46,110 L39,110 Z" fill="#4A7C59"/>
        <circle cx="160" cy="65" r="5" fill="#7C5CFC"/><circle cx="168" cy="68" r="5" fill="#7C5CFC"/><circle cx="164" cy="74" r="5" fill="#7C5CFC"/>
      </svg>`;
    }
    if (el.shapeType === 'botanical-wreath') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="75" stroke="#5A8F69" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M30,100 C30,50 70,25 100,25 C130,25 170,50 170,100" stroke="#7CB08B" stroke-width="2" fill="none"/>
        <circle cx="60" cy="45" r="6" fill="#E88D96"/><circle cx="140" cy="45" r="6" fill="#E88D96"/>
        <circle cx="35" cy="90" r="5" fill="#E8A9C1"/><circle cx="165" cy="90" r="5" fill="#E8A9C1"/>
      </svg>`;
    }
    // === NEW UNIQUE ILLUSTRATIONS ===
    if (el.shapeType === 'balloon-arch') {
      return `<svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Colorful balloon bunch -->
        <!-- Strings -->
        <path d="M150,195 C148,170 135,155 120,140" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C150,168 150,150 150,130" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C152,170 165,155 180,140" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C142,175 118,160 95,145" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C158,175 182,160 205,145" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C136,180 100,170 70,150" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <path d="M150,195 C164,180 200,170 230,150" stroke="#8B7B6B" stroke-width="1.5" fill="none"/>
        <!-- Balloons -->
        <ellipse cx="120" cy="118" rx="22" ry="26" fill="#E88D96"/><path d="M120,144 L118,150 L122,150 Z" fill="#D87882"/>
        <ellipse cx="150" cy="104" rx="22" ry="26" fill="#7C5CFC"/><path d="M150,130 L148,136 L152,136 Z" fill="#6A4AE0"/>
        <ellipse cx="180" cy="118" rx="22" ry="26" fill="#5A8F69"/><path d="M180,144 L178,150 L182,150 Z" fill="#4A7F59"/>
        <ellipse cx="95" cy="128" rx="20" ry="24" fill="#F4C543"/><path d="M95,152 L93,158 L97,158 Z" fill="#E0B030"/>
        <ellipse cx="205" cy="128" rx="20" ry="24" fill="#E88D96"/><path d="M205,152 L203,158 L207,158 Z" fill="#D87882"/>
        <ellipse cx="70" cy="135" rx="18" ry="22" fill="#7C5CFC"/><path d="M70,157 L68,163 L72,163 Z" fill="#6A4AE0"/>
        <ellipse cx="230" cy="135" rx="18" ry="22" fill="#F4DFC8"/><path d="M230,157 L228,163 L232,163 Z" fill="#E0C5A0"/>
        <!-- Confetti dots -->
        <circle cx="40" cy="50" r="4" fill="#E88D96"/><circle cx="260" cy="40" r="5" fill="#7C5CFC"/>
        <circle cx="55" cy="80" r="3" fill="#F4C543"/><circle cx="245" cy="75" r="3" fill="#5A8F69"/>
        <circle cx="30" cy="115" r="3" fill="#7C5CFC"/><circle cx="270" cy="110" r="4" fill="#E88D96"/>
      </svg>`;
    }
    if (el.shapeType === 'birthday-hat') {
      return `<svg width="100%" height="100%" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Party hat -->
        <polygon points="120,20 60,185 180,185" fill="#7C5CFC"/>
        <polygon points="120,20 70,185 100,185" fill="#6A4AE0" opacity="0.5"/>
        <!-- Stripes -->
        <line x1="90" y1="110" x2="150" y2="110" stroke="#E8A9C1" stroke-width="3"/>
        <line x1="80" y1="145" x2="160" y2="145" stroke="#F4C543" stroke-width="3"/>
        <!-- Pompom -->
        <circle cx="120" cy="20" r="12" fill="#F4C543"/>
        <circle cx="112" cy="14" r="5" fill="#FFFFFF" opacity="0.6"/>
        <!-- Brim -->
        <ellipse cx="120" cy="185" rx="60" ry="10" fill="#E8A9C1"/>
        <!-- Streamers -->
        <path d="M180,185 C200,170 210,145 230,130" stroke="#E88D96" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M60,185 C40,170 30,145 10,130" stroke="#7C5CFC" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M180,185 C195,155 215,135 235,105" stroke="#F4C543" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Stars -->
        <circle cx="215" cy="125" r="5" fill="#F4C543"/><circle cx="25" cy="125" r="5" fill="#E88D96"/>
        <circle cx="235" cy="100" r="4" fill="#E8A9C1"/><circle cx="10" cy="95" r="4" fill="#7C5CFC"/>
      </svg>`;
    }
    if (el.shapeType === 'champagne-glasses') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left glass -->
        <path d="M60,30 L48,100 C48,120 72,120 72,100 Z" fill="${el.fill || '#E8F4F8'}" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2"/>
        <line x1="60" y1="120" x2="60" y2="175" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2"/>
        <line x1="44" y1="175" x2="76" y2="175" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2.5"/>
        <!-- Right glass -->
        <path d="M140,30 L128,100 C128,120 152,120 152,100 Z" fill="${el.fill || '#E8F4F8'}" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2"/>
        <line x1="140" y1="120" x2="140" y2="175" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2"/>
        <line x1="124" y1="175" x2="156" y2="175" stroke="${el.stroke || '#B8D4DC'}" stroke-width="2.5"/>
        <!-- Bubbles left -->
        <circle cx="57" cy="90" r="2.5" fill="${el.stroke || '#B8D4DC'}"/>
        <circle cx="64" cy="75" r="2" fill="${el.stroke || '#B8D4DC'}"/>
        <circle cx="55" cy="60" r="1.5" fill="${el.stroke || '#B8D4DC'}"/>
        <!-- Bubbles right -->
        <circle cx="137" cy="90" r="2.5" fill="${el.stroke || '#B8D4DC'}"/>
        <circle cx="144" cy="75" r="2" fill="${el.stroke || '#B8D4DC'}"/>
        <circle cx="135" cy="60" r="1.5" fill="${el.stroke || '#B8D4DC'}"/>
        <!-- Clink mark -->
        <path d="M75,35 L125,35" stroke="${el.stroke || '#B8D4DC'}" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M95,15 L100,5 L105,15" stroke="#F4C543" stroke-width="2" fill="none"/>
        <circle cx="100" cy="4" r="3" fill="#F4C543"/>
        <!-- Hearts/sparkles -->
        <text x="85" y="12" font-size="14" fill="#E8A9C1" font-family="serif">♥</text>
      </svg>`;
    }
    if (el.shapeType === 'confetti-burst') {
      return `<svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Stars and confetti scattered -->
        <rect x="30" y="30" width="12" height="12" rx="2" fill="#E88D96" transform="rotate(20 36 36)"/>
        <rect x="250" y="20" width="10" height="10" rx="2" fill="#7C5CFC" transform="rotate(-15 255 25)"/>
        <rect x="60" y="70" width="8" height="8" rx="1" fill="#F4C543" transform="rotate(35 64 74)"/>
        <rect x="220" y="60" width="8" height="8" rx="1" fill="#5A8F69" transform="rotate(-30 224 64)"/>
        <rect x="15" y="120" width="10" height="10" rx="2" fill="#7C5CFC" transform="rotate(45 20 125)"/>
        <rect x="265" y="110" width="9" height="9" rx="2" fill="#E88D96" transform="rotate(-20 269 114)"/>
        <circle cx="150" cy="25" r="8" fill="#E8A9C1"/>
        <circle cx="90" cy="45" r="6" fill="#7C5CFC"/>
        <circle cx="210" cy="40" r="7" fill="#F4C543"/>
        <circle cx="40" cy="155" r="6" fill="#5A8F69"/>
        <circle cx="260" cy="150" r="7" fill="#E88D96"/>
        <!-- Central star burst -->
        <polygon points="150,60 157,80 178,80 162,93 168,113 150,101 132,113 138,93 122,80 143,80" fill="#F4C543"/>
        <!-- Streamers -->
        <path d="M30,180 C50,160 70,170 90,150" stroke="#E88D96" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M200,170 C220,150 240,165 260,145" stroke="#7C5CFC" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M100,190 C120,170 140,180 160,160" stroke="#5A8F69" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`;
    }
    if (el.shapeType === 'butterfly') {
      return `<svg width="100%" height="100%" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left wings -->
        <path d="M120,100 C120,100 50,50 30,80 C10,110 60,140 120,100" fill="#E88D96" opacity="0.85"/>
        <path d="M120,100 C120,100 55,120 50,155 C45,185 100,175 120,100" fill="#E8A9C1" opacity="0.85"/>
        <!-- Right wings -->
        <path d="M120,100 C120,100 190,50 210,80 C230,110 180,140 120,100" fill="#7C5CFC" opacity="0.85"/>
        <path d="M120,100 C120,100 185,120 190,155 C195,185 140,175 120,100" fill="#A080F8" opacity="0.85"/>
        <!-- Wing details -->
        <circle cx="75" cy="88" r="8" fill="#FFFFFF" opacity="0.4"/>
        <circle cx="165" cy="88" r="8" fill="#FFFFFF" opacity="0.4"/>
        <circle cx="80" cy="145" r="6" fill="#FFFFFF" opacity="0.3"/>
        <circle cx="160" cy="145" r="6" fill="#FFFFFF" opacity="0.3"/>
        <!-- Body -->
        <ellipse cx="120" cy="100" rx="5" ry="25" fill="#2C2A29"/>
        <!-- Antennae -->
        <path d="M118,75 C110,55 95,45 90,35" stroke="#2C2A29" stroke-width="1.5" fill="none"/>
        <path d="M122,75 C130,55 145,45 150,35" stroke="#2C2A29" stroke-width="1.5" fill="none"/>
        <circle cx="90" cy="34" r="4" fill="#E88D96"/>
        <circle cx="150" cy="34" r="4" fill="#7C5CFC"/>
        <!-- Small flowers -->
        <circle cx="35" cy="165" r="8" fill="#E8A9C1" opacity="0.6"/>
        <circle cx="205" cy="165" r="8" fill="#A080F8" opacity="0.6"/>
        <circle cx="20" cy="145" r="5" fill="#E88D96" opacity="0.5"/>
        <circle cx="220" cy="145" r="5" fill="#7C5CFC" opacity="0.5"/>
      </svg>`;
    }
    if (el.shapeType === 'sun-arch') {
      return `<svg width="100%" height="100%" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Large sun circle -->
        <circle cx="130" cy="110" r="65" fill="${el.fill || '#FFF5D6'}" stroke="#F4C543" stroke-width="4"/>
        <!-- Sun rays -->
        <line x1="130" y1="30" x2="130" y2="12" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="196" y1="54" x2="208" y2="42" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="218" y1="120" x2="236" y2="120" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="196" y1="186" x2="208" y2="198" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="130" y1="190" x2="130" y2="200" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="64" y1="186" x2="52" y2="198" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="42" y1="120" x2="24" y2="120" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <line x1="64" y1="54" x2="52" y2="42" stroke="#F4C543" stroke-width="3" stroke-linecap="round"/>
        <!-- Inner face details -->
        <circle cx="113" cy="100" r="6" fill="#E88D96"/>
        <circle cx="147" cy="100" r="6" fill="#E88D96"/>
        <path d="M112,120 Q130,135 148,120" stroke="#E88D96" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Small stars around -->
        <polygon points="50,35 53,45 63,45 55,51 58,61 50,55 42,61 45,51 37,45 47,45" fill="#F4C543" transform="scale(0.6) translate(30,-20)"/>
        <polygon points="215,25 218,35 228,35 220,41 223,51 215,45 207,51 210,41 202,35 212,35" fill="#F4C543" transform="scale(0.6) translate(155,15)"/>
      </svg>`;
    }
    if (el.shapeType === 'wedding-rings') {
      return `<svg width="100%" height="100%" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left ring -->
        <circle cx="85" cy="90" r="45" stroke="${el.stroke || '#D4AF37'}" stroke-width="8" fill="none"/>
        <circle cx="85" cy="90" r="45" stroke="${el.stroke || '#D4AF37'}" stroke-width="8" fill="none" opacity="0.3"/>
        <!-- Right ring (overlapping) -->
        <circle cx="135" cy="90" r="45" stroke="${el.stroke2 || '#E8A9C1'}" stroke-width="8" fill="none"/>
        <!-- Diamond on left -->
        <polygon points="85,50 92,62 85,75 78,62" fill="#B8D4F0" stroke="#8AB0D0" stroke-width="1.5"/>
        <!-- Small flowers -->
        <circle cx="47" cy="58" r="5" fill="#E8A9C1"/><circle cx="123" cy="58" r="5" fill="#E88D96"/>
        <circle cx="47" cy="122" r="5" fill="#5A8F69"/><circle cx="123" cy="122" r="5" fill="#7CB08B"/>
        <!-- Botanical branch -->
        <path d="M155,50 C170,55 178,70 175,90 C172,110 160,122 155,130" stroke="#5A8F69" stroke-width="2" fill="none"/>
        <ellipse cx="170" cy="65" rx="8" ry="5" fill="#7CB08B" transform="rotate(-20 170 65)"/>
        <ellipse cx="175" cy="90" rx="8" ry="5" fill="#7CB08B"/>
        <ellipse cx="168" cy="115" rx="8" ry="5" fill="#7CB08B" transform="rotate(20 168 115)"/>
      </svg>`;
    }
    if (el.shapeType === 'heart-vines') {
      return `<svg width="100%" height="100%" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Large central heart -->
        <path d="M110,160 C110,160 30,110 30,65 A40,40 0 0,1 110,55 A40,40 0 0,1 190,65 C190,110 110,160 110,160 Z" fill="${el.fill || '#FFD6DD'}" stroke="${el.stroke || '#E88D96'}" stroke-width="2"/>
        <!-- Inner heart highlight -->
        <path d="M110,140 C110,140 55,105 55,75 A28,28 0 0,1 110,70 A28,28 0 0,1 165,75 C165,105 110,140 110,140 Z" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.5"/>
        <!-- Vines -->
        <path d="M30,65 C15,50 8,30 20,15" stroke="#5A8F69" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M190,65 C205,50 212,30 200,15" stroke="#5A8F69" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Leaves on vines -->
        <ellipse cx="18" cy="42" rx="7" ry="4" fill="#7CB08B" transform="rotate(-40 18 42)"/>
        <ellipse cx="12" cy="22" rx="7" ry="4" fill="#5A8F69" transform="rotate(-60 12 22)"/>
        <ellipse cx="202" cy="42" rx="7" ry="4" fill="#7CB08B" transform="rotate(40 202 42)"/>
        <ellipse cx="208" cy="22" rx="7" ry="4" fill="#5A8F69" transform="rotate(60 208 22)"/>
        <!-- Small flowers -->
        <circle cx="20" cy="10" r="6" fill="#E88D96"/>
        <circle cx="200" cy="10" r="6" fill="#E8A9C1"/>
        <circle cx="50" cy="180" r="5" fill="#E88D96"/>
        <circle cx="170" cy="180" r="5" fill="#E8A9C1"/>
      </svg>`;
    }
    if (el.shapeType === 'baby-mobile') {
      return `<svg width="100%" height="100%" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Main horizontal bar -->
        <line x1="50" y1="40" x2="230" y2="40" stroke="#8B7B6B" stroke-width="4" stroke-linecap="round"/>
        <!-- Hanging string from ceiling -->
        <line x1="140" y1="5" x2="140" y2="40" stroke="#8B7B6B" stroke-width="2"/>
        <!-- Hanging items strings -->
        <line x1="75" y1="40" x2="75" y2="80" stroke="#B0A090" stroke-width="1.5"/>
        <line x1="140" y1="40" x2="140" y2="90" stroke="#B0A090" stroke-width="1.5"/>
        <line x1="205" y1="40" x2="205" y2="80" stroke="#B0A090" stroke-width="1.5"/>
        <line x1="107" y1="40" x2="95" y2="120" stroke="#B0A090" stroke-width="1.5"/>
        <line x1="175" y1="40" x2="175" y2="115" stroke="#B0A090" stroke-width="1.5"/>
        <!-- Star -->
        <polygon points="75,80 79,93 93,93 82,101 86,114 75,107 64,114 68,101 57,93 71,93" fill="#F4C543" stroke="#E0B030" stroke-width="1"/>
        <!-- Moon -->
        <path d="M130,90 A24,24 0 1,1 130,138 A16,16 0 1,0 130,90 Z" fill="#E8A9C1"/>
        <!-- Cloud -->
        <ellipse cx="205" cy="88" rx="20" ry="12" fill="#E8E3F5"/>
        <circle cx="190" cy="88" r="10" fill="#E8E3F5"/>
        <circle cx="220" cy="88" r="10" fill="#E8E3F5"/>
        <!-- Small heart -->
        <path d="M95,120 C95,120 78,108 78,99 A12,12 0 0,1 95,98 A12,12 0 0,1 112,99 C112,108 95,120 95,120 Z" fill="#E88D96"/>
        <!-- Small star -->
        <polygon points="175,115 178,123 187,123 180,128 183,137 175,132 167,137 170,128 163,123 172,123" fill="#7C5CFC" transform="scale(0.7) translate(77,50)"/>
        <!-- Dots trail -->
        <circle cx="110" cy="175" r="4" fill="#E8A9C1"/>
        <circle cx="140" cy="185" r="5" fill="#5A8F69"/>
        <circle cx="170" cy="175" r="4" fill="#F4C543"/>
      </svg>`;
    }
    if (el.shapeType === 'stork') {
      return `<svg width="100%" height="100%" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cloud -->
        <ellipse cx="120" cy="35" rx="55" ry="30" fill="#F0F8FF"/>
        <circle cx="85" cy="35" r="22" fill="#F0F8FF"/>
        <circle cx="155" cy="35" r="22" fill="#F0F8FF"/>
        <!-- Bundle / baby sling -->
        <ellipse cx="120" cy="100" rx="35" ry="28" fill="#E8F0FF" stroke="#7C5CFC" stroke-width="2"/>
        <path d="M85,100 C85,70 155,70 155,100" stroke="#7C5CFC" stroke-width="3" fill="none"/>
        <!-- Baby face -->
        <circle cx="120" cy="96" r="14" fill="#FAD5B5"/>
        <circle cx="115" cy="93" r="2.5" fill="#5C4033"/>
        <circle cx="125" cy="93" r="2.5" fill="#5C4033"/>
        <path d="M115,101 Q120,106 125,101" stroke="#E88D96" stroke-width="1.5" fill="none"/>
        <!-- Stork body -->
        <path d="M155,95 C175,85 195,90 200,100 C205,110 195,120 185,115 C180,112 175,105 170,110 L155,115 Z" fill="#FFFFFF" stroke="#D0D0D0" stroke-width="2"/>
        <!-- Stork head & neck -->
        <path d="M190,100 C195,85 205,75 210,65" stroke="#2C2A29" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="214" cy="62" rx="10" ry="7" fill="#FFFFFF" stroke="#2C2A29" stroke-width="2"/>
        <!-- Beak -->
        <path d="M220,60 L232,58 L220,65 Z" fill="#E88D96"/>
        <!-- Stork wing -->
        <path d="M160,100 C165,75 195,70 195,95" fill="#F0F0F0" stroke="#D0D0D0" stroke-width="1.5"/>
        <!-- Legs -->
        <line x1="155" y1="120" x2="148" y2="170" stroke="#E88D96" stroke-width="3" stroke-linecap="round"/>
        <line x1="165" y1="120" x2="172" y2="170" stroke="#E88D96" stroke-width="3" stroke-linecap="round"/>
        <line x1="148" y1="170" x2="135" y2="175" stroke="#E88D96" stroke-width="2"/>
        <line x1="172" y1="170" x2="185" y2="175" stroke="#E88D96" stroke-width="2"/>
        <!-- Stars -->
        <circle cx="40" cy="50" r="4" fill="#F4C543"/>
        <circle cx="200" cy="170" r="4" fill="#E8A9C1"/>
        <circle cx="30" cy="130" r="3" fill="#7C5CFC"/>
      </svg>`;
    }
    if (el.shapeType === 'mortarboard') {
      return `<svg width="100%" height="100%" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cap top (flat board) -->
        <polygon points="130,30 230,75 130,120 30,75" fill="${el.fill || '#2C2A29'}" stroke="#1A1817" stroke-width="2"/>
        <!-- Cap top highlight -->
        <polygon points="130,30 230,75 130,120 30,75" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.5"/>
        <!-- Cap side/cylinder -->
        <path d="M70,75 L70,110 C70,122 98,130 130,130 C162,130 190,122 190,110 L190,75" fill="${el.fill || '#2C2A29'}" stroke="#1A1817" stroke-width="2"/>
        <!-- Tassel string -->
        <line x1="130" y1="30" x2="185" y2="55" stroke="#D4AF37" stroke-width="2"/>
        <line x1="185" y1="55" x2="185" y2="120" stroke="#D4AF37" stroke-width="2"/>
        <!-- Tassel end -->
        <rect x="178" y="120" width="14" height="25" rx="3" fill="#D4AF37"/>
        <line x1="179" y1="145" x2="175" y2="165" stroke="#D4AF37" stroke-width="1.5"/>
        <line x1="182" y1="145" x2="181" y2="167" stroke="#D4AF37" stroke-width="1.5"/>
        <line x1="185" y1="145" x2="187" y2="167" stroke="#D4AF37" stroke-width="1.5"/>
        <line x1="188" y1="145" x2="193" y2="165" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Diploma scroll -->
        <rect x="50" y="150" width="100" height="60" rx="4" fill="#FFF9F0" stroke="#D4AF37" stroke-width="1.5"/>
        <line x1="65" y1="165" x2="135" y2="165" stroke="#D4AF37" stroke-width="1"/>
        <line x1="65" y1="175" x2="135" y2="175" stroke="#E8A9C1" stroke-width="1"/>
        <line x1="65" y1="185" x2="115" y2="185" stroke="#D4AF37" stroke-width="1"/>
        <circle cx="100" cy="200" r="8" fill="#E88D96"/>
        <!-- Stars -->
        <circle cx="215" cy="155" r="5" fill="#F4C543"/>
        <circle cx="235" cy="130" r="4" fill="#D4AF37"/>
        <circle cx="220" cy="105" r="3" fill="#F4C543"/>
      </svg>`;
    }
    if (el.shapeType === 'wine-glass') {
      return `<svg width="100%" height="100%" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Wine glass bowl -->
        <path d="M65,25 L55,110 C55,140 145,140 145,110 L135,25 Z" fill="${el.fill || '#F9E8E8'}" stroke="${el.stroke || '#C0A0A0'}" stroke-width="2"/>
        <!-- Wine fill -->
        <path d="M68,90 L60,110 C60,135 140,135 140,110 L132,90 Z" fill="#B8506A" opacity="0.7"/>
        <!-- Stem -->
        <line x1="100" y1="140" x2="100" y2="190" stroke="${el.stroke || '#C0A0A0'}" stroke-width="3"/>
        <!-- Base -->
        <ellipse cx="100" cy="192" rx="42" ry="8" fill="${el.stroke || '#C0A0A0'}"/>
        <!-- Grapes -->
        <circle cx="155" cy="85" r="8" fill="#7C5CFC" opacity="0.8"/>
        <circle cx="168" cy="90" r="8" fill="#7C5CFC" opacity="0.8"/>
        <circle cx="160" cy="100" r="8" fill="#6A4AE0" opacity="0.8"/>
        <circle cx="148" cy="97" r="8" fill="#7C5CFC" opacity="0.8"/>
        <circle cx="162" cy="112" r="7" fill="#6A4AE0" opacity="0.7"/>
        <!-- Grape leaf -->
        <path d="M165,75 C175,60 185,65 180,78 C185,65 185,55 172,55 C158,55 158,68 165,75 Z" fill="#5A8F69"/>
        <!-- Stem curl -->
        <path d="M163,75 C165,68 168,65 170,60" stroke="#5A8F69" stroke-width="1.5" fill="none"/>
        <!-- Decorative dots -->
        <circle cx="38" cy="60" r="4" fill="#E88D96"/>
        <circle cx="30" cy="100" r="3" fill="#E8A9C1"/>
        <circle cx="40" cy="140" r="3" fill="#E88D96"/>
      </svg>`;
    }
    if (el.shapeType === 'envelope-seal') {
      return `<svg width="100%" height="100%" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Envelope body -->
        <rect x="25" y="45" width="210" height="140" rx="6" fill="#FFFDF8" stroke="${el.stroke || '#D4AF37'}" stroke-width="2"/>
        <!-- Envelope flap open -->
        <path d="M25,45 L130,115 L235,45 Z" fill="#FFF5E0" stroke="${el.stroke || '#D4AF37'}" stroke-width="1.5"/>
        <!-- Envelope fold lines -->
        <path d="M25,185 L120,115" stroke="${el.stroke || '#D4AF37'}" stroke-width="1.5" opacity="0.5"/>
        <path d="M235,185 L140,115" stroke="${el.stroke || '#D4AF37'}" stroke-width="1.5" opacity="0.5"/>
        <!-- Wax seal -->
        <circle cx="130" cy="120" r="22" fill="#E88D96"/>
        <circle cx="130" cy="120" r="17" fill="#D87882"/>
        <!-- Monogram on seal -->
        <text x="123" y="126" font-size="16" fill="#FFFFFF" font-family="serif" font-weight="bold">✦</text>
        <!-- Botanical sprig -->
        <path d="M25,160 C40,145 55,150 65,140" stroke="#5A8F69" stroke-width="2" fill="none"/>
        <ellipse cx="48" cy="148" rx="7" ry="4" fill="#7CB08B" transform="rotate(-30 48 148)"/>
        <circle cx="65" cy="140" r="5" fill="#E88D96"/>
        <path d="M195,160 C210,145 220,150 230,140" stroke="#5A8F69" stroke-width="2" fill="none"/>
        <ellipse cx="213" cy="148" rx="7" ry="4" fill="#7CB08B" transform="rotate(30 213 148)"/>
        <circle cx="195" cy="160" r="5" fill="#E8A9C1"/>
        <!-- Small stars -->
        <circle cx="45" cy="60" r="3" fill="#F4C543"/>
        <circle cx="215" cy="65" r="3" fill="#D4AF37"/>
      </svg>`;
    }
    if (el.shapeType === 'moon-stars') {
      return `<svg width="100%" height="100%" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Large crescent moon -->
        <path d="M130,20 A70,70 0 1,1 130,160 A48,48 0 1,0 130,20 Z" fill="${el.fill || '#F4C543'}" opacity="0.9"/>
        <!-- Moon glow -->
        <path d="M130,20 A70,70 0 1,1 130,160 A48,48 0 1,0 130,20 Z" fill="none" stroke="${el.fill || '#F4C543'}" stroke-width="8" opacity="0.2"/>
        <!-- Large stars -->
        <polygon points="195,30 199,42 212,42 202,50 206,62 195,55 184,62 188,50 178,42 191,42" fill="${el.fill || '#F4C543'}"/>
        <polygon points="45,80 48,90 59,90 50,96 53,106 45,100 37,106 40,96 31,90 42,90" fill="#E8A9C1"/>
        <polygon points="220,90 223,98 232,98 225,103 228,112 220,107 212,112 215,103 208,98 217,98" fill="#FFFFFF" opacity="0.8"/>
        <!-- Medium stars -->
        <circle cx="60" cy="40" r="5" fill="#E8A9C1"/>
        <circle cx="200" cy="140" r="5" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="30" cy="130" r="4" fill="#F4C543" opacity="0.8"/>
        <circle cx="240" cy="60" r="4" fill="#E8A9C1"/>
        <!-- Small dots -->
        <circle cx="50" cy="170" r="3" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="210" cy="175" r="3" fill="#F4C543" opacity="0.7"/>
        <circle cx="235" cy="150" r="2.5" fill="#E8A9C1" opacity="0.6"/>
        <circle cx="25" cy="60" r="2.5" fill="#FFFFFF" opacity="0.5"/>
        <!-- Sparkle lines -->
        <line x1="195" y1="25" x2="195" y2="15" stroke="#F4C543" stroke-width="1.5" opacity="0.8"/>
        <line x1="190" y1="30" x2="180" y2="30" stroke="#F4C543" stroke-width="1.5" opacity="0.8"/>
        <line x1="200" y1="30" x2="210" y2="30" stroke="#F4C543" stroke-width="1.5" opacity="0.8"/>
        <line x1="195" y1="35" x2="195" y2="45" stroke="#F4C543" stroke-width="1.5" opacity="0.8"/>
      </svg>`;
    }
    return '';
  }
  // Generates complete HTML representation of a design or template inside gallery thumbnail
  // Premium templates come from the database (isPremium/price in paise, isOwned per user)
  function renderPremiumPill(template) {
    if (!template.isPremium) return '';
    if (template.isOwned) return '<span class="card-premium-pill is-owned">Purchased</span>';
    const price = template.price ? ` · ₹${(template.price / 100).toLocaleString('en-IN')}` : '';
    return `<span class="card-premium-pill">Premium${price}</span>`;
  }

  function renderTemplateCardMarkup(template) {
    const isFav = state.favorites.includes(template.id);
    const bgStyle = template.bg.type === 'solid'
      ? `background-color: ${template.bg.value};`
      : `background: linear-gradient(135deg, ${template.bg.color1 || '#F4F0FC'}, ${template.bg.color2 || '#FFFFFF'});`;

    let elementsMarkup = template.elements.map(el => {
      let content = '';
      if (el.type === 'text') {
        const textStyle = `
          font-family: ${el.fontFamily || 'Inter'};
          font-size: ${el.fontSize || 14}px;
          font-weight: ${el.fontWeight || '400'};
          font-style: ${el.fontStyle || 'normal'};
          color: ${el.color || '#2C2A29'};
          letter-spacing: ${el.letterSpacing || 0}px;
          line-height: ${el.lineHeight || 1.3};
          text-align: ${el.textAlign || 'center'};
          white-space: pre-wrap;
          word-break: break-word;
        `;
        content = `<div style="${textStyle}">${el.content}</div>`;
      } else if (el.type === 'shape') {
        content = renderSvgElement(el);
      } else if (el.type === 'image') {
        content = `<img src="${el.url}" style="width:100%;height:100%;object-fit:cover;" alt="Photo">`;
      }

      const wrapperStyle = `
        position: absolute;
        left: ${el.x}px;
        top: ${el.y}px;
        width: ${el.width}px;
        height: ${el.height}px;
        transform: rotate(${el.rotation || 0}deg);
      `;

      return `<div style="${wrapperStyle}" data-shape-type="${el.shapeType || ''}">${content}</div>`;
    }).join('');

    return `
      <div class="template-card" data-id="${template.id}" data-category="${template.category}">
        <div class="card-preview-wrap">
          <div class="card-canvas-container">
            <div class="card-canvas-thumb" style="${bgStyle}">
              ${elementsMarkup}
            </div>
          </div>
          <div class="card-overlay">
            <div class="overlay-bottom">
              <button class="btn-primary btn-sm btn-use-template" data-id="${template.id}">Use Template</button>
            </div>
          </div>
        </div>
        <div class="card-details">
          <div class="card-details-left">
            <span class="card-category-pill">${template.category}</span>${renderPremiumPill(template)}
            <h3 class="card-title">${template.title}</h3>
          </div>
          <button class="btn-fav-card ${isFav ? 'favorited' : ''}" data-id="${template.id}" title="Save Favorite" aria-label="Favorite">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 5. SEARCH & FILTERING ENGINE
  // --------------------------------------------------------------------------
  function filterTemplates() {
    return state.templates.filter(tpl => {
      // Category Chip Filter
      if (state.selectedCategory !== 'All') {
        if (tpl.category !== state.selectedCategory) return false;
      }

      // Search Query
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const matchesTitle = tpl.title.toLowerCase().includes(q);
        const matchesCat = tpl.category.toLowerCase().includes(q);
        const matchesStyle = tpl.style.toLowerCase().includes(q);
        const matchesTags = tpl.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCat && !matchesStyle && !matchesTags) return false;
      }

      // Advanced Filters Dropdowns
      if (state.filters.occasion !== 'All' && tpl.category.toLowerCase() !== state.filters.occasion.toLowerCase()) return false;
      if (state.filters.style !== 'All' && tpl.style.toLowerCase() !== state.filters.style.toLowerCase()) return false;
      if (state.filters.color !== 'All' && tpl.color.toLowerCase() !== state.filters.color.toLowerCase()) return false;
      if (state.filters.orientation !== 'All' && tpl.orientation.toLowerCase() !== state.filters.orientation.toLowerCase()) return false;

      return true;
    });
  }

  function renderGallery() {
    const filtered = filterTemplates();
    DOM.resultsCountText.textContent = `${filtered.length} design${filtered.length === 1 ? '' : 's'} found`;

    const isFilteredActive = state.searchQuery || state.selectedCategory !== 'All' || Object.values(state.filters).some(v => v !== 'All');
    DOM.resetFiltersBtn.classList.toggle('hidden', !isFilteredActive);
    DOM.clearSearchBtn.classList.toggle('hidden', !state.searchQuery);

    if (filtered.length === 0) {
      DOM.templateGrid.innerHTML = '';
      DOM.emptyResultsState.classList.remove('hidden');
    } else {
      DOM.emptyResultsState.classList.add('hidden');
      DOM.templateGrid.innerHTML = filtered.map(renderTemplateCardMarkup).join('');
    }

    updateFavoritesBadges();
    requestAnimationFrame(scaleCardThumbs);
  }

  function renderTrending() {
    const trendingList = state.templates.slice(0, 8);
    DOM.trendingTrack.innerHTML = trendingList.map(renderTemplateCardMarkup).join('');
    requestAnimationFrame(scaleCardThumbs);
  }

  // Scale every .card-canvas-thumb (500x700 canvas) to fill its .card-canvas-container
  function scaleCardThumbs() {
    document.querySelectorAll('.card-preview-wrap').forEach(wrap => {
      const container = wrap.querySelector('.card-canvas-container') || wrap;
      const thumb = wrap.querySelector('.card-canvas-thumb');
      if (!thumb) return;
      const scaleX = container.clientWidth / 500;
      thumb.style.transform = `scale(${scaleX})`;
    });
  }

  function updateFavoritesBadges() {
    DOM.favCountBadge.textContent = state.favorites.length;
  }

  // --------------------------------------------------------------------------
  // 6. EDITOR CANVAS & INTERACTIVE TOOLING ENGINE
  // --------------------------------------------------------------------------
  function getTemplateById(id) {
    if (!id) return null;
    return state.templates.find(t => t.id === id) ||
      state.templates.find(t => t.id.startsWith(id)) ||
      state.templates.find(t => t.id.includes(id)) || null;
  }

  function createBlankDesign() {
    openEditorWithTemplate({
      id: null,
      title: 'Untitled Card',
      category: 'Custom Card',
      tags: ['blank', 'custom'],
      bg: { type: 'solid', value: '#FFFFFF' },
      elements: []
    });
  }

  function openEditorWithTemplate(templateOrDesign) {
    state.editorDesignId = templateOrDesign.id;
    state.editorTitle = templateOrDesign.title || 'My Custom Design';
    const defaultPaper = { type: 'solid', value: '#FFFDF9' };
    state.editorSurfaces = templateOrDesign.surfaces
      ? JSON.parse(JSON.stringify(templateOrDesign.surfaces))
      : {
          front: { bg: JSON.parse(JSON.stringify(templateOrDesign.bg)), elements: JSON.parse(JSON.stringify(templateOrDesign.elements)) },
          insideLeft: {
            bg: JSON.parse(JSON.stringify(defaultPaper)),
            elements: [{ id: `inside-left-${Date.now()}`, type: 'text', content: 'A little note,\nmade especially for you.', fontSize: 28, fontFamily: 'Playfair Display', fontStyle: 'italic', color: '#796D68', textAlign: 'center', x: 60, y: 285, width: 380, height: 100, rotation: 0 }]
          },
          insideRight: {
            bg: JSON.parse(JSON.stringify(defaultPaper)),
            elements: [{ id: `inside-right-${Date.now()}`, type: 'text', content: 'Wishing you a beautiful day filled with moments worth remembering.\n\nWith warm wishes', fontSize: 24, fontFamily: 'Playfair Display', color: '#4F4743', lineHeight: 1.6, textAlign: 'center', x: 65, y: 240, width: 370, height: 220, rotation: 0 }]
          },
          back: {
            bg: JSON.parse(JSON.stringify(defaultPaper)),
            elements: [{ id: `back-${Date.now()}`, type: 'text', content: 'PetalWish\nCards that connect.', fontSize: 18, fontFamily: 'Playfair Display', color: '#8A817C', lineHeight: 1.5, textAlign: 'center', x: 125, y: 560, width: 250, height: 80, rotation: 0 }]
          }
        };
    state.editorSurface = 'front';
    state.editorBg = JSON.parse(JSON.stringify(state.editorSurfaces.front.bg));
    state.editorElements = JSON.parse(JSON.stringify(state.editorSurfaces.front.elements));
    state.selectedElementId = null;
    state.historyStack = [];
    state.redoStack = [];
    state.zoomLevel = 1;

    if (DOM.designCanvasWrapper) DOM.designCanvasWrapper.style.transform = 'scale(1)';
    if (DOM.zoomPercentText) DOM.zoomPercentText.textContent = '100%';
    DOM.editorProjectTitle.value = state.editorTitle;
    DOM.viewEditor.classList.remove('is-reviewing');
    document.getElementById('editor-next-btn').querySelector('span').textContent = 'Next';
    document.getElementById('editor-next-menu').classList.remove('open');
    document.getElementById('editor-next-btn').setAttribute('aria-expanded', 'false');

    switchView('editor');
    renderEditorCanvas();
    renderSubpanel('templates');
    renderPropertiesPanel();
    pushHistoryState();
    updateEditorSurfaceControls();
  }

  function persistActiveEditorSurface() {
    if (!state.editorSurfaces[state.editorSurface]) return;
    state.editorSurfaces[state.editorSurface] = {
      bg: JSON.parse(JSON.stringify(state.editorBg)),
      elements: JSON.parse(JSON.stringify(state.editorElements))
    };
  }

  function updateEditorSurfaceControls() {
    document.querySelectorAll('.card-surface-btn').forEach(button => {
      button.classList.toggle('active', button.dataset.surface === state.editorSurface);
    });
    const label = document.getElementById('active-surface-label');
    if (label) label.textContent = ({ front: 'Front Cover', insideLeft: 'Inside Left', insideRight: 'Inside Right', back: 'Back Cover' })[state.editorSurface];
  }

  function switchEditorSurface(surface) {
    if (!state.editorSurfaces[surface] || surface === state.editorSurface) return;
    persistActiveEditorSurface();
    state.editorSurface = surface;
    state.editorBg = JSON.parse(JSON.stringify(state.editorSurfaces[surface].bg));
    state.editorElements = JSON.parse(JSON.stringify(state.editorSurfaces[surface].elements));
    state.selectedElementId = null;
    state.historyStack = [];
    state.redoStack = [];
    DOM.designCanvasWrapper.classList.remove('surface-turn');
    void DOM.designCanvasWrapper.offsetWidth;
    DOM.designCanvasWrapper.classList.add('surface-turn');
    renderEditorCanvas();
    renderPropertiesPanel();
    pushHistoryState();
    updateEditorSurfaceControls();
  }

  function pushHistoryState() {
    const snapshot = JSON.stringify({
      title: state.editorTitle,
      bg: state.editorBg,
      elements: state.editorElements
    });
    if (state.historyStack.length === 0 || state.historyStack[state.historyStack.length - 1] !== snapshot) {
      state.historyStack.push(snapshot);
      if (state.historyStack.length > 30) state.historyStack.shift();
      state.redoStack = [];
    }
  }

  function undo() {
    if (state.historyStack.length > 1) {
      const current = state.historyStack.pop();
      state.redoStack.push(current);
      const previous = JSON.parse(state.historyStack[state.historyStack.length - 1]);
      state.editorTitle = previous.title;
      state.editorBg = previous.bg;
      state.editorElements = previous.elements;
      state.selectedElementId = null;
      renderEditorCanvas();
      renderPropertiesPanel();
      showToast('Undo performed');
    }
  }

  function redo() {
    if (state.redoStack.length > 0) {
      const next = state.redoStack.pop();
      state.historyStack.push(next);
      const stateObj = JSON.parse(next);
      state.editorTitle = stateObj.title;
      state.editorBg = stateObj.bg;
      state.editorElements = stateObj.elements;
      state.selectedElementId = null;
      renderEditorCanvas();
      renderPropertiesPanel();
      showToast('Redo performed');
    }
  }

  // Render Main Interactive Canvas Surface
  function renderEditorCanvas() {
    const bgStyle = state.editorBg.type === 'grid'
      ? `
    background-color: ${state.editorBg.value};
    background-image:
      linear-gradient(${state.editorBg.gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${state.editorBg.gridColor} 1px, transparent 1px);
    background-size: ${state.editorBg.gridSize}px ${state.editorBg.gridSize}px;
  `
      : state.editorBg.type === 'solid'
        ? `background-color: ${state.editorBg.value};`
        : `background: linear-gradient(135deg, ${state.editorBg.color1}, ${state.editorBg.color2});`;

    DOM.designCanvas.setAttribute('style', bgStyle);
    DOM.designCanvas.innerHTML = '';

    state.editorElements.forEach(el => {
      const elNode = document.createElement('div');
      elNode.className = `canvas-element ${el.id === state.selectedElementId ? 'selected' : ''}`;
      elNode.setAttribute('data-id', el.id);

      let content = '';
      if (el.type === 'text') {
        const textStyle = `
          font-family: ${el.fontFamily || 'Inter'};
          font-size: ${el.fontSize || 14}px;
          font-weight: ${el.fontWeight || '400'};
          font-style: ${el.fontStyle || 'normal'};
          color: ${el.color || '#2C2A29'};
          letter-spacing: ${el.letterSpacing || 0}px;
          line-height: ${el.lineHeight || 1.3};
          text-align: ${el.textAlign || 'center'};
          white-space: pre-wrap;
          word-break: break-word;
          width: 100%;
          height: 100%;
        `;
        content = `<div style="${textStyle}">${el.content}</div>`;
      } else if (el.type === 'shape') {
        content = renderSvgElement(el);
      } else if (el.type === 'image') {
        content = `<img src="${el.url}" style="width:100%;height:100%;object-fit:cover;" alt="Uploaded Image">`;
      }

      elNode.style.left = `${el.x}px`;
      elNode.style.top = `${el.y}px`;
      elNode.style.width = `${el.width}px`;
      elNode.style.height = `${el.height}px`;
      elNode.style.transform = `rotate(${el.rotation || 0}deg)`;

      elNode.innerHTML = content;

      // Add selection handles if active
      if (el.id === state.selectedElementId) {
        const handlesHtml = `
          <div class="handle handle-nw" data-handle="nw"></div>
          <div class="handle handle-ne" data-handle="ne"></div>
          <div class="handle handle-sw" data-handle="sw"></div>
          <div class="handle handle-se" data-handle="se"></div>
          <div class="handle handle-rot" data-handle="rot"></div>
        `;
        elNode.insertAdjacentHTML('beforeend', handlesHtml);
      }

      DOM.designCanvas.appendChild(elNode);
    });

    attachCanvasInteractionEvents();
  }

  // Mouse & Pointer Dragging / Resizing / Rotating Logic
  function attachCanvasInteractionEvents() {
    let isDragging = false;
    let isResizing = false;
    let isRotating = false;
    let activeHandle = null;
    let startX = 0, startY = 0;
    let origX = 0, origY = 0, origW = 0, origH = 0;

    DOM.designCanvas.querySelectorAll('.canvas-element').forEach(node => {
      node.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        const id = node.getAttribute('data-id');
        const handle = e.target.getAttribute('data-handle');

        state.selectedElementId = id;
        renderEditorCanvas();
        renderPropertiesPanel();

        const elObj = state.editorElements.find(item => item.id === id);
        if (!elObj) return;

        startX = e.clientX;
        startY = e.clientY;
        origX = elObj.x;
        origY = elObj.y;
        origW = elObj.width;
        origH = elObj.height;

        if (handle) {
          if (handle === 'rot') {
            isRotating = true;
          } else {
            isResizing = true;
            activeHandle = handle;
          }
        } else {
          isDragging = true;
        }

        function onPointerMove(mvEvt) {
          const dx = (mvEvt.clientX - startX) / state.zoomLevel;
          const dy = (mvEvt.clientY - startY) / state.zoomLevel;

          if (isDragging) {
            elObj.x = origX + dx;
            elObj.y = origY + dy;
          } else if (isResizing) {
            if (activeHandle === 'se') {
              elObj.width = Math.max(20, origW + dx);
              elObj.height = Math.max(20, origH + dy);
            } else if (activeHandle === 'sw') {
              elObj.x = origX + dx;
              elObj.width = Math.max(20, origW - dx);
              elObj.height = Math.max(20, origH + dy);
            } else if (activeHandle === 'ne') {
              elObj.y = origY + dy;
              elObj.width = Math.max(20, origW + dx);
              elObj.height = Math.max(20, origH - dy);
            } else if (activeHandle === 'nw') {
              elObj.x = origX + dx;
              elObj.y = origY + dy;
              elObj.width = Math.max(20, origW - dx);
              elObj.height = Math.max(20, origH - dy);
            }
          } else if (isRotating) {
            const rect = node.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rad = Math.atan2(mvEvt.clientY - cy, mvEvt.clientX - cx);
            let deg = Math.round(rad * (180 / Math.PI)) + 90;
            if (deg < 0) deg += 360;
            elObj.rotation = deg;
          }

          renderEditorCanvas();
          renderPropertiesPanel();
        }

        function onPointerUp() {
          if (isDragging || isResizing || isRotating) {
            pushHistoryState();
          }
          isDragging = false;
          isResizing = false;
          isRotating = false;
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        }

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
      });
    });

    DOM.designCanvas.addEventListener('pointerdown', (e) => {
      if (e.target === DOM.designCanvas) {
        state.selectedElementId = null;
        renderEditorCanvas();
        renderPropertiesPanel();
      }
    });
  }

  // Render Subpanel Tools (Templates, Elements, Text, Uploads, Background, Layers)
  function renderSubpanel(tabName) {
    document.querySelectorAll('.editor-nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });

    let html = '';
    if (tabName === 'templates') {
      html = `
        <div class="subpanel-header">
          <h3>Swap Template</h3>
          <p style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">Select a layout composition to load on canvas:</p>
        </div>
        <div class="subpanel-content">
          <div class="template-swap-list" style="display:flex;flex-direction:column;gap:10px;">
            ${state.templates.map(t => `
              <div class="template-swap-item" data-id="${t.id}">
                <div class="swap-item-info">
                  <span class="swap-item-title">${t.title}</span>
                  <div class="swap-item-meta">
                    <span class="swap-cat-badge">${t.category}</span>
                    <span class="swap-style-badge">${t.style}</span>
                  </div>
                </div>
                <div class="swap-color-indicator" style="${t.bg.type === 'solid' ? 'background:' + t.bg.value : 'background:linear-gradient(135deg,' + (t.bg.color1 || '#F4F0FC') + ',' + (t.bg.color2 || '#FFFFFF') + ')'}" title="${t.color}"></div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (tabName === 'elements') {
      html = `
        <div class="subpanel-header"><h3>Add Elements</h3></div>
        <div class="subpanel-content">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <button class="btn-outline add-shape-btn" data-shape="circle">Circle</button>
            <button class="btn-outline add-shape-btn" data-shape="rect">Rectangle</button>
            <button class="btn-outline add-shape-btn" data-shape="arch">Arch Frame</button>
            <button class="btn-outline add-shape-btn" data-shape="border">Decorative Border</button>
            <button class="btn-outline add-shape-btn" data-shape="floral">Botanical Floral</button>
            <button class="btn-outline add-shape-btn" data-shape="star">Star Accent</button>
            <button class="btn-outline add-shape-btn" data-shape="blob">Abstract Blob</button>
            <button class="btn-outline add-shape-btn" data-shape="line">Divider Line</button>
          </div>
        </div>
      `;
    } else if (tabName === 'text') {
      html = `
        <div class="subpanel-header"><h3>Add Typography</h3></div>
        <div class="subpanel-content">
          <button class="btn-primary width-full add-text-btn" data-preset="heading">Add Heading</button>
          <button class="btn-secondary width-full add-text-btn" data-preset="subheading">Add Subheading</button>
          <button class="btn-outline width-full add-text-btn" data-preset="paragraph">Add Body Paragraph</button>
        </div>
      `;
    } else if (tabName === 'uploads') {
      html = `
        <div class="subpanel-header"><h3>Upload Photo</h3></div>
        <div class="subpanel-content">
          <p style="font-size:0.85rem;color:var(--text-muted);">Upload your personal image (JPG or PNG) to place on your design:</p>
          <input type="file" id="image-upload-input" accept="image/*" style="display:none;">
          <button class="btn-primary width-full" id="trigger-upload-btn">Upload Image File</button>
        </div>
      `;
    } else if (tabName === 'background') {
      html = `
        <div class="subpanel-header"><h3>Canvas Background</h3></div>
        <div class="subpanel-content">
          <label style="font-size:0.85rem;font-weight:600;">Solid Palette Presets</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${['#FAF8F5', '#FCECE4', '#F4F0FC', '#FFFFFF', '#1A1817', '#E8A9C1', '#7C5CFC'].map(c => `
              <div class="bg-preset-dot" data-color="${c}" style="width:32px;height:32px;border-radius:50%;background:${c};border:1px solid #CCC;cursor:pointer;"></div>
            `).join('')}
          </div>
          <div class="prop-field-group" style="margin-top:16px;">
            <label>Custom Color Picker</label>
            <input type="color" id="custom-bg-picker" value="${state.editorBg.value || '#FAF8F5'}">
          </div>
        </div>
      `;
    } else if (tabName === 'layers') {
      html = `
        <div class="subpanel-header"><h3>Canvas Layers</h3></div>
        <div class="subpanel-content">
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${state.editorElements.map((el, i) => `
              <div class="layer-item-row ${el.id === state.selectedElementId ? 'active' : ''}" data-id="${el.id}" style="display:flex;align-items:center;justify-space-between;padding:8px 12px;border:1px solid var(--border-color);border-radius:6px;background:var(--bg-subtle);">
                <span style="font-size:0.85rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:140px;">${el.type.toUpperCase()}: ${el.content || el.shapeType || 'Image'}</span>
                <button class="btn-delete-layer" data-id="${el.id}" style="color:red;font-size:0.8rem;padding:2px 6px;">Delete</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    DOM.editorSubpanel.innerHTML = html;
    attachSubpanelEvents();
  }

  function attachSubpanelEvents() {
    // Add text preset
    DOM.editorSubpanel.querySelectorAll('.add-text-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        let newEl = { id: 'el-' + Date.now(), type: 'text', x: 100, y: 300, width: 300, height: 50, rotation: 0 };

        if (preset === 'heading') {
          newEl.content = 'YOUR HEADING';
          newEl.fontSize = 32;
          newEl.fontFamily = 'Playfair Display';
          newEl.fontWeight = '700';
          newEl.color = '#2C2A29';
          newEl.textAlign = 'center';
        } else if (preset === 'subheading') {
          newEl.content = 'SUBTITLE OR HONOREE NAME';
          newEl.fontSize = 18;
          newEl.fontFamily = 'Outfit';
          newEl.fontWeight = '600';
          newEl.color = '#7C5CFC';
          newEl.textAlign = 'center';
        } else {
          newEl.content = 'Add your custom event details, address, or RSVP message here...';
          newEl.fontSize = 14;
          newEl.fontFamily = 'Inter';
          newEl.fontWeight = '400';
          newEl.color = '#5C5856';
          newEl.textAlign = 'center';
        }

        state.editorElements.push(newEl);
        state.selectedElementId = newEl.id;
        renderEditorCanvas();
        renderPropertiesPanel();
        pushHistoryState();
        showToast('Text element added');
      });
    });

    // Add shape preset
    DOM.editorSubpanel.querySelectorAll('.add-shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const shape = btn.getAttribute('data-shape');
        let newEl = {
          id: 'el-' + Date.now(),
          type: 'shape',
          shapeType: shape,
          x: 150,
          y: 250,
          width: shape === 'line' ? 200 : 120,
          height: shape === 'line' ? 4 : 120,
          fill: shape === 'circle' ? '#E8E3F5' : (shape === 'star' ? '#E8A9C1' : '#7C5CFC'),
          stroke: '#2C2A29',
          strokeWidth: 2,
          rotation: 0
        };

        if (shape === 'border') {
          newEl.x = 20;
          newEl.y = 20;
          newEl.width = 460;
          newEl.height = 660;
          newEl.fill = 'none';
        }

        state.editorElements.push(newEl);
        state.selectedElementId = newEl.id;
        renderEditorCanvas();
        renderPropertiesPanel();
        pushHistoryState();
        showToast('Element added');
      });
    });

    // Background color dots
    DOM.editorSubpanel.querySelectorAll('.bg-preset-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const color = dot.getAttribute('data-color');
        state.editorBg = { type: 'solid', value: color };
        renderEditorCanvas();
        pushHistoryState();
        showToast('Background updated');
      });
    });

    const bgPicker = DOM.editorSubpanel.querySelector('#custom-bg-picker');
    if (bgPicker) {
      bgPicker.addEventListener('input', (e) => {
        state.editorBg = { type: 'solid', value: e.target.value };
        renderEditorCanvas();
      });
      bgPicker.addEventListener('change', () => pushHistoryState());
    }

    // Trigger upload
    const uploadTrigger = DOM.editorSubpanel.querySelector('#trigger-upload-btn');
    const uploadInput = DOM.editorSubpanel.querySelector('#image-upload-input');
    if (uploadTrigger && uploadInput) {
      uploadTrigger.addEventListener('click', () => uploadInput.click());
      uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            const newEl = {
              id: 'el-' + Date.now(),
              type: 'image',
              url: evt.target.result,
              x: 100,
              y: 200,
              width: 300,
              height: 250,
              rotation: 0
            };
            state.editorElements.push(newEl);
            state.selectedElementId = newEl.id;
            renderEditorCanvas();
            renderPropertiesPanel();
            pushHistoryState();
            showToast('Image uploaded successfully');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Template Swap
    DOM.editorSubpanel.querySelectorAll('.template-swap-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const tpl = state.templates.find(t => t.id === id);
        if (tpl) {
          state.editorBg = JSON.parse(JSON.stringify(tpl.bg));
          state.editorElements = JSON.parse(JSON.stringify(tpl.elements));
          state.selectedElementId = null;
          renderEditorCanvas();
          renderPropertiesPanel();
          pushHistoryState();
          showToast('Template swapped');
        }
      });
    });

    // Delete layer
    DOM.editorSubpanel.querySelectorAll('.btn-delete-layer').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteElementById(id);
      });
    });
  }

  function deleteElementById(id) {
    state.editorElements = state.editorElements.filter(el => el.id !== id);
    if (state.selectedElementId === id) state.selectedElementId = null;
    renderEditorCanvas();
    renderPropertiesPanel();
    pushHistoryState();
    showToast('Element deleted');
  }

  // Render Right Property Inspector Controls
  function renderPropertiesPanel() {
    if (!state.selectedElementId) {
      DOM.propsContent.innerHTML = '<div class="no-selection-msg">Select any element on the canvas to customize typography, colors, size, or layer positioning.</div>';
      return;
    }

    const el = state.editorElements.find(item => item.id === state.selectedElementId);
    if (!el) return;

    let html = '';

    if (el.type === 'text') {
      html = `
        <div class="prop-field-group">
          <label>Text Wording</label>
          <textarea id="prop-text-content" rows="3">${el.content}</textarea>
        </div>

        <div class="prop-field-group">
          <label>Font Family</label>
          <select id="prop-font-family">
            <option value="Inter" ${el.fontFamily === 'Inter' ? 'selected' : ''}>Inter (Sans)</option>
            <option value="Playfair Display" ${el.fontFamily === 'Playfair Display' ? 'selected' : ''}>Playfair Display (Serif)</option>
            <option value="Outfit" ${el.fontFamily === 'Outfit' ? 'selected' : ''}>Outfit (Display)</option>
            <option value="Montserrat" ${el.fontFamily === 'Montserrat' ? 'selected' : ''}>Montserrat</option>
            <option value="Merriweather" ${el.fontFamily === 'Merriweather' ? 'selected' : ''}>Merriweather</option>
            <option value="Poppins" ${el.fontFamily === 'Poppins' ? 'selected' : ''}>Poppins</option>
            <option value="Georgia" ${el.fontFamily === 'Georgia' ? 'selected' : ''}>Georgia</option>
          </select>
        </div>

        <div class="prop-row-2">
          <div class="prop-field-group">
            <label>Font Size (px)</label>
            <input type="number" id="prop-font-size" value="${el.fontSize || 14}" min="8" max="120">
          </div>
          <div class="prop-field-group">
            <label>Color</label>
            <input type="color" id="prop-text-color" value="${el.color || '#2C2A29'}">
          </div>
        </div>

        <div class="prop-row-2">
          <div class="prop-field-group">
            <label>Font Weight</label>
            <select id="prop-font-weight">
              <option value="300" ${el.fontWeight == 300 ? 'selected' : ''}>Light (300)</option>
              <option value="400" ${el.fontWeight == 400 ? 'selected' : ''}>Regular (400)</option>
              <option value="600" ${el.fontWeight == 600 ? 'selected' : ''}>SemiBold (600)</option>
              <option value="700" ${el.fontWeight == 700 ? 'selected' : ''}>Bold (700)</option>
            </select>
          </div>
          <div class="prop-field-group">
            <label>Spacing (px)</label>
            <input type="number" id="prop-letter-spacing" value="${el.letterSpacing || 0}">
          </div>
        </div>
      `;
    } else if (el.type === 'shape') {
      html = `
        <div class="prop-row-2">
          <div class="prop-field-group">
            <label>Fill Color</label>
            <input type="color" id="prop-fill-color" value="${el.fill && el.fill !== 'none' ? el.fill : '#7C5CFC'}">
          </div>
          <div class="prop-field-group">
            <label>Stroke Color</label>
            <input type="color" id="prop-stroke-color" value="${el.stroke || '#2C2A29'}">
          </div>
        </div>
      `;
    }

    // Common Layer Actions (Delete, Layer Order)
    html += `
      <hr style="border:0;border-top:1px solid var(--border-color);margin:12px 0;">
      <div class="prop-field-group">
        <label>Layer Ordering</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button class="btn-outline btn-sm" id="layer-up-btn">Bring Forward</button>
          <button class="btn-outline btn-sm" id="layer-down-btn">Send Backward</button>
        </div>
      </div>
      <button class="btn-secondary btn-sm width-full" id="layer-delete-btn" style="color:var(--status-danger);border-color:var(--status-danger);">Delete Element</button>
    `;

    DOM.propsContent.innerHTML = html;
    attachPropertiesPanelEvents(el);
  }

  function attachPropertiesPanelEvents(el) {
    const textContent = DOM.propsContent.querySelector('#prop-text-content');
    if (textContent) {
      textContent.addEventListener('input', (e) => {
        el.content = e.target.value;
        renderEditorCanvas();
      });
      textContent.addEventListener('change', () => pushHistoryState());
    }

    const fontFamily = DOM.propsContent.querySelector('#prop-font-family');
    if (fontFamily) {
      fontFamily.addEventListener('change', (e) => {
        el.fontFamily = e.target.value;
        renderEditorCanvas();
        pushHistoryState();
      });
    }

    const fontSize = DOM.propsContent.querySelector('#prop-font-size');
    if (fontSize) {
      fontSize.addEventListener('change', (e) => {
        el.fontSize = parseInt(e.target.value, 10) || 14;
        renderEditorCanvas();
        pushHistoryState();
      });
    }

    const textColor = DOM.propsContent.querySelector('#prop-text-color');
    if (textColor) {
      textColor.addEventListener('input', (e) => {
        el.color = e.target.value;
        renderEditorCanvas();
      });
      textColor.addEventListener('change', () => pushHistoryState());
    }

    const fontWeight = DOM.propsContent.querySelector('#prop-font-weight');
    if (fontWeight) {
      fontWeight.addEventListener('change', (e) => {
        el.fontWeight = e.target.value;
        renderEditorCanvas();
        pushHistoryState();
      });
    }

    const letterSpacing = DOM.propsContent.querySelector('#prop-letter-spacing');
    if (letterSpacing) {
      letterSpacing.addEventListener('change', (e) => {
        el.letterSpacing = parseInt(e.target.value, 10) || 0;
        renderEditorCanvas();
        pushHistoryState();
      });
    }

    const fillColor = DOM.propsContent.querySelector('#prop-fill-color');
    if (fillColor) {
      fillColor.addEventListener('input', (e) => {
        el.fill = e.target.value;
        renderEditorCanvas();
      });
      fillColor.addEventListener('change', () => pushHistoryState());
    }

    const deleteBtn = DOM.propsContent.querySelector('#layer-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => deleteElementById(el.id));
    }

    const layerUp = DOM.propsContent.querySelector('#layer-up-btn');
    if (layerUp) {
      layerUp.addEventListener('click', () => {
        const idx = state.editorElements.findIndex(i => i.id === el.id);
        if (idx < state.editorElements.length - 1) {
          const temp = state.editorElements[idx];
          state.editorElements[idx] = state.editorElements[idx + 1];
          state.editorElements[idx + 1] = temp;
          renderEditorCanvas();
          pushHistoryState();
        }
      });
    }

    const layerDown = DOM.propsContent.querySelector('#layer-down-btn');
    if (layerDown) {
      layerDown.addEventListener('click', () => {
        const idx = state.editorElements.findIndex(i => i.id === el.id);
        if (idx > 0) {
          const temp = state.editorElements[idx];
          state.editorElements[idx] = state.editorElements[idx - 1];
          state.editorElements[idx - 1] = temp;
          renderEditorCanvas();
          pushHistoryState();
        }
      });
    }
  }

  // Export Design Canvas as Crisp High-Res PNG File using pure HTML5 Canvas API
  function exportCanvasToPng() {
    showToast('Preparing high-resolution PNG download...');

    const canvas = document.createElement('canvas');
    const width = 1000;
    const height = 1400;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Scale factor (from 500x700 surface to 1000x1400 canvas)
    const scale = 2;

    // Background
    if (state.editorBg.type === 'solid') {
      ctx.fillStyle = state.editorBg.value || '#FAF8F5';
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, state.editorBg.color1 || '#F4F0FC');
      grad.addColorStop(1, state.editorBg.color2 || '#FFFFFF');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // Render Elements
    let imageLoadPromises = state.editorElements.map(el => {
      return new Promise(resolve => {
        ctx.save();
        const cx = (el.x + el.width / 2) * scale;
        const cy = (el.y + el.height / 2) * scale;
        ctx.translate(cx, cy);
        ctx.rotate((el.rotation || 0) * Math.PI / 180);
        ctx.translate(-cx, -cy);

        const x = el.x * scale;
        const y = el.y * scale;
        const w = el.width * scale;
        const h = el.height * scale;

        if (el.type === 'text') {
          ctx.fillStyle = el.color || '#2C2A29';
          ctx.font = `${el.fontStyle || ''} ${el.fontWeight || '400'} ${el.fontSize * scale}px "${el.fontFamily || 'Inter'}", sans-serif`;
          ctx.textAlign = el.textAlign || 'center';
          ctx.textBaseline = 'top';

          const textX = el.textAlign === 'center' ? x + w / 2 : (el.textAlign === 'right' ? x + w : x);
          const lines = el.content.split('\n');
          const lineHeightPx = (el.fontSize * (el.lineHeight || 1.3)) * scale;

          lines.forEach((line, idx) => {
            ctx.fillText(line, textX, y + (idx * lineHeightPx));
          });
          ctx.restore();
          resolve();
        } else if (el.type === 'shape') {
          ctx.fillStyle = el.fill || 'none';
          ctx.strokeStyle = el.stroke || '#2C2A29';
          ctx.lineWidth = (el.strokeWidth || 2) * scale;

          if (el.shapeType === 'rect' || el.shapeType === 'border') {
            if (el.fill && el.fill !== 'none') ctx.fillRect(x, y, w, h);
            if (el.stroke && el.stroke !== 'none') ctx.strokeRect(x, y, w, h);
          } else if (el.shapeType === 'circle') {
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
            if (el.fill && el.fill !== 'none') ctx.fill();
            if (el.stroke && el.stroke !== 'none') ctx.stroke();
          } else {
            // Basic fallback bounding fill
            if (el.fill && el.fill !== 'none') ctx.fillRect(x, y, w, h);
          }
          ctx.restore();
          resolve();
        } else if (el.type === 'image') {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();
            resolve();
          };
          img.onerror = () => {
            ctx.restore();
            resolve();
          };
          img.src = el.url;
        } else {
          ctx.restore();
          resolve();
        }
      });
    });

    Promise.all(imageLoadPromises).then(() => {
      const link = document.createElement('a');
      link.download = `${state.editorTitle.replace(/\s+/g, '_')}_PetalWish.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Download completed!');
    });
  }

  function buildDesignPayload() {
    persistActiveEditorSurface();
    // The front of the card is what the dashboard thumbnail shows
    const front = state.editorSurfaces.front || { bg: state.editorBg, elements: state.editorElements };
    return {
      title: (state.editorTitle || '').trim().slice(0, 120) || 'My Custom Design',
      bg: JSON.parse(JSON.stringify(front.bg)),
      elements: JSON.parse(JSON.stringify(front.elements)),
      surfaces: JSON.parse(JSON.stringify(state.editorSurfaces))
    };
  }

  function upsertMyDesign(design) {
    state.myDesigns = [design, ...state.myDesigns.filter(d => d.id !== design.id)];
  }

  // Guests: keep designs on this device (localStorage), as before
  function saveDesignLocally(payload) {
    const isOwnLocalDesign = state.myDesigns.some(d => d.id === state.editorDesignId);
    const designObj = {
      ...payload,
      id: isOwnLocalDesign ? state.editorDesignId : 'design-' + Date.now(),
      updatedAt: formatDesignDate(new Date()),
      category: 'Saved Design'
    };
    upsertMyDesign(designObj);
    state.editorDesignId = designObj.id;
    localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(state.myDesigns));
  }

  // Save current design: to the account (MongoDB) when signed in, otherwise to this device
  async function saveCurrentDesign() {
    const payload = buildDesignPayload();

    if (!isSignedIn()) {
      saveDesignLocally(payload);
      showToast('Design saved on this device. Log in to keep it in your account.');
      renderMyDesignsDashboard();
      return;
    }

    if (state.isSavingDesign) return;
    state.isSavingDesign = true;
    const saveBtn = document.getElementById('editor-save-btn');
    if (saveBtn) saveBtn.classList.add('is-busy');

    try {
      const existing = state.myDesigns.find(d => d.id === state.editorDesignId);
      let response;
      if (existing) {
        response = await API.designs.update(existing.id, payload);
      } else {
        // Opened from a template: link the design to it (editorDesignId is the template slug)
        const sourceTemplate = state.templates.find(t => t.id === state.editorDesignId);
        response = await API.designs.create(sourceTemplate ? { ...payload, templateId: sourceTemplate.id } : payload);
      }

      const saved = normalizeApiDesign(response.data);
      upsertMyDesign(saved);
      state.editorDesignId = saved.id;
      showToast('Design saved to your account.');
      renderMyDesignsDashboard();
    } catch (err) {
      if (err.status !== 401) showToast(`Could not save the design: ${apiErrorMessage(err)}`);
    } finally {
      state.isSavingDesign = false;
      if (saveBtn) saveBtn.classList.remove('is-busy');
    }
  }

  async function openSavedDesign(id) {
    const design = state.myDesigns.find(item => item.id === id);
    if (!design) return;
    if (!design.isPartial) {
      openEditorWithTemplate(design);
      return;
    }
    // The dashboard list has no canvas data: load the full design first
    try {
      const response = await API.designs.get(id);
      const full = normalizeApiDesign(response.data);
      upsertMyDesign(full);
      openEditorWithTemplate(full);
    } catch (err) {
      showToast(`Could not open the design: ${apiErrorMessage(err)}`);
    }
  }

  async function deleteSavedDesign(id) {
    if (isSignedIn()) {
      try {
        await API.designs.remove(id);
      } catch (err) {
        if (err.status !== 404) {
          showToast(`Could not delete the design: ${apiErrorMessage(err)}`);
          return;
        }
      }
    }
    state.myDesigns = state.myDesigns.filter(item => item.id !== id);
    if (!isSignedIn()) localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(state.myDesigns));
    if (state.editorDesignId === id) state.editorDesignId = null;
    renderMyDesignsDashboard();
    showToast('Design deleted');
  }

  // --------------------------------------------------------------------------
  // 7. DASHBOARD & RSVP MANAGEMENT ENGINE
  // --------------------------------------------------------------------------
  function renderMyDesignsDashboard() {
    if (state.myDesigns.length === 0) {
      DOM.savedDesignsGrid.innerHTML = '';
      DOM.emptyDesignsState.classList.remove('hidden');
    } else {
      DOM.emptyDesignsState.classList.add('hidden');
      DOM.savedDesignsGrid.innerHTML = state.myDesigns.map(design => `
        <div class="template-card" data-id="${design.id}">
          <div class="card-preview-wrap">
            <div class="card-canvas-thumb" style="${design.bg.type === 'solid' ? 'background:' + design.bg.value : 'background:linear-gradient(135deg,' + design.bg.color1 + ',' + design.bg.color2 + ')'}"></div>
            <div class="card-overlay">
              <div class="overlay-bottom" style="display:flex;gap:8px;justify-content:center;">
                <button class="btn-primary btn-sm btn-edit-saved" data-id="${design.id}">Edit</button>
                <button class="btn-outline btn-sm btn-delete-saved" data-id="${design.id}" style="background:#FFF;color:red;border-color:red;">Delete</button>
              </div>
            </div>
          </div>
          <div class="card-details">
            <span class="card-category-pill">Last edited: ${escapeHtml(design.updatedAt)}</span>
            <h3 class="card-title">${escapeHtml(design.title)}</h3>
          </div>
        </div>
      `).join('');

      DOM.savedDesignsGrid.querySelectorAll('.btn-edit-saved').forEach(btn => {
        btn.addEventListener('click', () => openSavedDesign(btn.getAttribute('data-id')));
      });

      DOM.savedDesignsGrid.querySelectorAll('.btn-delete-saved').forEach(btn => {
        btn.addEventListener('click', () => deleteSavedDesign(btn.getAttribute('data-id')));
      });
    }
  }

  function renderFavoritesDashboard() {
    const favTemplates = state.templates.filter(t => state.favorites.includes(t.id));
    if (favTemplates.length === 0) {
      DOM.favoritesGrid.innerHTML = '';
      DOM.emptyFavsState.classList.remove('hidden');
    } else {
      DOM.emptyFavsState.classList.add('hidden');
      DOM.favoritesGrid.innerHTML = favTemplates.map(renderTemplateCardMarkup).join('');
    }
  }

  function renderRsvpStats() {
    const total = state.rsvps.length;
    const accept = state.rsvps.filter(r => r.status === 'Accept').length;
    const maybe = state.rsvps.filter(r => r.status === 'Maybe').length;
    const decline = state.rsvps.filter(r => r.status === 'Decline').length;

    DOM.rsvpTotalVal.textContent = total;
    DOM.rsvpAcceptVal.textContent = accept;
    DOM.rsvpMaybeVal.textContent = maybe;
    DOM.rsvpDeclineVal.textContent = decline;

    DOM.barNumAccept.textContent = accept;
    DOM.barNumMaybe.textContent = maybe;
    DOM.barNumDecline.textContent = decline;

    const maxVal = Math.max(1, total);
    DOM.barAccept.style.height = `${(accept / maxVal) * 100}%`;
    DOM.barMaybe.style.height = `${(maybe / maxVal) * 100}%`;
    DOM.barDecline.style.height = `${(decline / maxVal) * 100}%`;

    if (total === 0) {
      DOM.guestLogList.innerHTML = '<li class="guest-log-empty">No responses recorded yet. Click an RSVP button above to test!</li>';
    } else {
      DOM.guestLogList.innerHTML = state.rsvps.map(r => `
        <li class="guest-log-item">
          <span><strong>${r.name}</strong> (${r.time})</span>
          <span style="font-weight:600;color:${r.status === 'Accept' ? '#2E7D32' : (r.status === 'Maybe' ? '#ED6C02' : '#D32F2F')}">${r.status}</span>
        </li>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION MANAGER & USER UI
  // --------------------------------------------------------------------------
  function getInitials(name) {
    if (!name) return 'W';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  }

  function updateUserAuthUI() {
    if (state.user) {
      if (DOM.navLoginBtn) DOM.navLoginBtn.classList.add('hidden');
      if (DOM.userHeaderProfile) DOM.userHeaderProfile.classList.remove('hidden');

      const initials = getInitials(state.user.name);
      if (DOM.avatarInitials) DOM.avatarInitials.textContent = initials;
      if (DOM.dropdownUserName) DOM.dropdownUserName.textContent = state.user.name;
      if (DOM.dropdownUserEmail) DOM.dropdownUserEmail.textContent = state.user.email;

      // Update Dashboard Sidebar User Card
      const userAvatar = document.querySelector('.user-avatar');
      const userName = document.querySelector('.user-name');
      const userPlan = document.querySelector('.user-plan');
      if (userAvatar) userAvatar.textContent = initials;
      if (userName) userName.textContent = state.user.name;
      if (userPlan) userPlan.textContent = state.user.plan === 'premium' ? 'PetalWish Premium' : 'PetalWish Member';
    } else {
      if (DOM.navLoginBtn) DOM.navLoginBtn.classList.remove('hidden');
      if (DOM.userHeaderProfile) DOM.userHeaderProfile.classList.add('hidden');

      const userAvatar = document.querySelector('.user-avatar');
      const userName = document.querySelector('.user-name');
      const userPlan = document.querySelector('.user-plan');
      if (userAvatar) userAvatar.textContent = 'W';
      if (userName) userName.textContent = 'Creative Workspace';
      if (userPlan) userPlan.textContent = 'PetalWish Studio';
    }
  }

  // --------------------------------------------------------------------------
  // BACKEND SYNC (server/ API: auth, templates, favorites, designs)
  // --------------------------------------------------------------------------
  function isSignedIn() {
    return Boolean(API && state.user && API.getToken());
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));
  }

  function apiErrorMessage(err) {
    return (err && (err.friendlyMessage || err.message)) || 'Something went wrong. Please try again.';
  }

  function formatDesignDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || '');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // API templates use `slug` for the id the rest of this file expects ("birthday-zoe-13")
  function normalizeApiTemplate(template) {
    return { ...template, id: template.slug, dbId: template.id };
  }

  function normalizeApiDesign(design) {
    return {
      ...design,
      updatedAt: formatDesignDate(design.updatedAt),
      surfaces: design.surfaces || undefined,
      elements: design.elements || [],
      // Dashboard listings leave out the canvas; the full design is fetched before editing
      isPartial: !Array.isArray(design.elements)
    };
  }

  function rerenderUserData() {
    updateFavoritesBadges();
    renderGallery();
    renderTrending();
    renderFavoritesDashboard();
    renderMyDesignsDashboard();
  }

  function setCurrentUser(user) {
    state.user = user
      ? { id: user.id, name: user.name, email: user.email, role: user.role, plan: user.plan, joined: user.createdAt }
      : null;
    if (state.user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    else localStorage.removeItem(STORAGE_KEYS.USER);
    updateUserAuthUI();
  }

  // Replaces the built-in template list with the catalogue stored in MongoDB.
  // If the server is not running, the site keeps working with INITIAL_TEMPLATES.
  async function loadTemplatesFromApi() {
    if (!API) return;
    try {
      const templates = await API.templates.listAll({ sort: 'featured' });
      if (!templates.length) return;
      state.templates = templates.map(normalizeApiTemplate);
      state.templatesSource = 'api';
      renderGallery();
      renderTrending();
      renderFavoritesDashboard();
    } catch (err) {
      console.info('[PetalWish] Backend not reachable, using built-in templates:', err.message);
    }
  }

  async function loadAccountData() {
    if (!isSignedIn()) return;
    const [favorites, designs] = await Promise.all([API.favorites.ids(), API.designs.listAll()]);
    state.favorites = favorites.data.slugs;
    state.myDesigns = designs.map(normalizeApiDesign);
    rerenderUserData();
  }

  // Moves favorites and designs saved on this device (as a guest) into the account
  async function migrateGuestData() {
    const localFavorites = readLocalList(STORAGE_KEYS.FAVORITES);
    const localDesigns = readLocalList(STORAGE_KEYS.DESIGNS);

    if (localFavorites.length) {
      await API.favorites.sync(localFavorites);
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    }

    const failed = [];
    let moved = 0;
    for (const design of localDesigns) {
      try {
        await API.designs.create({
          title: (design.title || 'My Custom Design').slice(0, 120),
          bg: design.bg || { type: 'solid', value: '#FFFFFF' },
          elements: design.elements || [],
          ...(design.surfaces ? { surfaces: design.surfaces } : {})
        });
        moved += 1;
      } catch (err) {
        console.warn('[PetalWish] Could not move a local design to the account:', err);
        failed.push(design);
      }
    }
    if (failed.length) localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(failed));
    else localStorage.removeItem(STORAGE_KEYS.DESIGNS);

    if (moved) showToast(`${moved} design${moved === 1 ? '' : 's'} from this device moved to your account.`);
  }

  async function completeSignIn(authData, { isNewAccount = false } = {}) {
    API.setToken(authData.token);
    setCurrentUser(authData.user);
    if (DOM.loginModalOverlay) DOM.loginModalOverlay.classList.add('hidden');
    showToast(isNewAccount ? `Welcome to PetalWish, ${state.user.name}!` : `Welcome back, ${state.user.name}!`);

    try {
      await migrateGuestData();
    } catch (err) {
      console.warn('[PetalWish] Guest data migration failed:', err);
    }
    try {
      // Reload templates too: they now carry this user's isFavorite / isOwned flags
      await Promise.all([loadTemplatesFromApi(), loadAccountData()]);
    } catch (err) {
      showToast(`Could not load your account data: ${apiErrorMessage(err)}`);
    }
  }

  // On page load: confirm the saved token is still valid and load the account
  async function restoreSession() {
    if (!API || !API.getToken()) return;
    try {
      const response = await API.auth.me();
      setCurrentUser(response.data);
      await loadAccountData();
    } catch (err) {
      if (err.status === 401) return; // handled by the petalwish:unauthorized listener
      console.info('[PetalWish] Could not restore the session:', err.message);
    }
  }

  function showAuthError(formName, message) {
    const box = document.getElementById(`${formName}-error`);
    if (!box) return;
    box.textContent = message || '';
    box.hidden = !message;
  }

  function setButtonBusy(button, busy, busyLabel) {
    if (!button) return;
    if (busy) {
      button.dataset.label = button.textContent;
      button.textContent = busyLabel;
      button.classList.add('is-busy');
      button.disabled = true;
    } else {
      button.textContent = button.dataset.label || button.textContent;
      button.classList.remove('is-busy');
      button.disabled = false;
    }
  }

  async function loginWithCredentials(email, password, submitButton) {
    if (!API) {
      showAuthError('signin', 'The login service failed to load. Please refresh the page.');
      return;
    }
    showAuthError('signin', '');
    setButtonBusy(submitButton, true, 'Logging in…');
    try {
      const response = await API.auth.login({ email, password });
      await completeSignIn(response.data);
      document.getElementById('signin-form')?.reset();
    } catch (err) {
      showAuthError('signin', apiErrorMessage(err));
    } finally {
      setButtonBusy(submitButton, false);
    }
  }

  async function registerAccount(name, email, password, submitButton) {
    if (!API) {
      showAuthError('signup', 'The sign-up service failed to load. Please refresh the page.');
      return;
    }
    showAuthError('signup', '');
    setButtonBusy(submitButton, true, 'Creating account…');
    try {
      const response = await API.auth.register({ name, email, password });
      await completeSignIn(response.data, { isNewAccount: true });
      document.getElementById('signup-form')?.reset();
    } catch (err) {
      showAuthError('signup', apiErrorMessage(err));
    } finally {
      setButtonBusy(submitButton, false);
    }
  }

  function logoutUser({ silent = false } = {}) {
    if (API) API.clearToken();
    setCurrentUser(null);
    // Back to guest mode: show whatever is saved on this device
    state.favorites = readLocalList(STORAGE_KEYS.FAVORITES);
    state.myDesigns = readLocalList(STORAGE_KEYS.DESIGNS);
    state.editorDesignId = null;
    loadTemplatesFromApi(); // drop the per-user isFavorite / isOwned flags
    rerenderUserData();
    if (DOM.userDropdownMenu) DOM.userDropdownMenu.classList.add('hidden');
    if (state.activeView === 'dashboard') switchView('home');
    if (!silent) showToast('Logged out successfully.');
  }

  // Favorites: optimistic update, then sync with the account (or localStorage for guests)
  async function toggleFavorite(templateId, rerender) {
    const wasFavorite = state.favorites.includes(templateId);
    state.favorites = wasFavorite
      ? state.favorites.filter(item => item !== templateId)
      : [...state.favorites, templateId];
    showToast(wasFavorite ? 'Removed from favorites' : 'Added to favorites');
    rerender();

    if (!isSignedIn()) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
      return;
    }

    try {
      if (wasFavorite) await API.favorites.remove(templateId);
      else await API.favorites.add(templateId);
    } catch (err) {
      // Expired session: the petalwish:unauthorized handler already signed out and told the user
      if (err.status === 401) return;
      // Roll back the optimistic change
      state.favorites = wasFavorite
        ? [...state.favorites, templateId]
        : state.favorites.filter(item => item !== templateId);
      rerender();
      showToast(`Could not update favorites: ${apiErrorMessage(err)}`);
    }
  }

  // --------------------------------------------------------------------------
  // 8. ROUTING & VIEW NAVIGATION
  // --------------------------------------------------------------------------
  function switchView(viewName) {
    state.activeView = viewName;
    [DOM.viewHome, DOM.viewExplore, DOM.viewDashboard, DOM.viewRsvp, DOM.viewEditor].forEach(view => {
      if (view) view.classList.remove('active');
    });

    if (viewName === 'home') {
      DOM.viewHome.classList.add('active');
      window.scrollTo(0, 0);
    } else if (viewName === 'explore') {
      if (DOM.viewExplore) DOM.viewExplore.classList.add('active');
      renderGallery();
      window.scrollTo(0, 0);
    } else if (viewName === 'dashboard') {
      DOM.viewDashboard.classList.add('active');
      renderMyDesignsDashboard();
      renderFavoritesDashboard();
      window.scrollTo(0, 0);
    } else if (viewName === 'rsvp') {
      DOM.viewRsvp.classList.add('active');
      renderRsvpStats();
      window.scrollTo(0, 0);
    } else if (viewName === 'editor') {
      DOM.viewEditor.classList.add('active');
    }
  }

  // Quick Preview Modal Handler
  function openTemplateModal(template) {
    state.activeModalTemplate = template;
    document.getElementById('modal-title').textContent = template.title;
    document.getElementById('modal-category').textContent = template.category;
    document.getElementById('modal-tags').innerHTML = template.tags.map(t => `<span class="meta-tag">${t}</span>`).join('');

    const isFav = state.favorites.includes(template.id);
    document.getElementById('modal-fav-text').textContent = isFav ? 'Remove Favorite' : 'Save to Favorites';

    // Render Preview
    const container = document.getElementById('modal-canvas-render');
    const bgStyle = template.bg.type === 'solid'
      ? `background-color: ${template.bg.value};`
      : `background: linear-gradient(135deg, ${template.bg.color1}, ${template.bg.color2});`;

    container.removeAttribute('style');

    const coverArtwork = template.elements.map(el => {
      let content = '';
      if (el.type === 'text') {
        const textStyle = `
          font-family: ${el.fontFamily || 'Inter'};
          font-size: ${(el.fontSize || 14) / 5}cqw;
          font-weight: ${el.fontWeight || '400'};
          font-style: ${el.fontStyle || 'normal'};
          color: ${el.color || '#2C2A29'};
          letter-spacing: ${(el.letterSpacing || 0) / 5}cqw;
          line-height: ${el.lineHeight || 1.3};
          text-align: ${el.textAlign || 'center'};
          white-space: pre-wrap;
        `;
        content = `<div style="${textStyle}">${el.content}</div>`;
      } else if (el.type === 'shape') {
        content = renderSvgElement(el);
      } else if (el.type === 'image') {
        content = `<img src="${el.url}" style="width:100%;height:100%;object-fit:cover;" alt="Photo">`;
      }

      return `<div style="position:absolute;left:${el.x / 5}%;top:${el.y / 7}%;width:${el.width / 5}%;height:${el.height / 7}%;transform:rotate(${el.rotation || 0}deg);">${content}</div>`;
    }).join('');

    container.innerHTML = `
      <button class="paper-card-scene" type="button" aria-label="Open ${template.title}" aria-expanded="false">
        <span class="paper-card-stage">
          <span class="paper-card-leaf paper-card-base">
            <span class="paper-card-face paper-card-inside-right">
              <span class="paper-card-kicker">${template.category}</span>
              <strong>${template.title}</strong>
              <span class="paper-card-message">Wishing you a beautiful day filled with moments worth remembering.</span>
              <span class="paper-card-signoff">With warm wishes</span>
            </span>
            <span class="paper-card-face paper-card-back-cover">
              <span class="paper-card-brand">PetalWish</span>
              <small>Cards that connect.</small>
            </span>
          </span>
          <span class="paper-card-leaf paper-card-cover">
            <span class="paper-card-face paper-card-front" style="${bgStyle}">
              ${coverArtwork}
              <span class="paper-card-edge"></span>
            </span>
            <span class="paper-card-face paper-card-inside-left">
              <span class="paper-card-ornament">✦</span>
              <span>A little note,<br>made especially for you.</span>
            </span>
          </span>
          <span class="paper-card-floor-shadow"></span>
        </span>
        <span class="paper-card-instruction">Click to open</span>
      </button>`;

    const paperCard = container.querySelector('.paper-card-scene');
    paperCard.addEventListener('click', () => {
      const isOpen = paperCard.classList.toggle('is-open');
      paperCard.setAttribute('aria-expanded', String(isOpen));
      paperCard.setAttribute('aria-label', `${isOpen ? 'Close' : 'Open'} ${template.title}`);
      paperCard.querySelector('.paper-card-instruction').textContent = isOpen ? 'Click to close' : 'Click to open';
    });

    DOM.templateModalOverlay.classList.remove('hidden');
  }

  function openCurrentEditorCardPreview() {
    const sourceTemplate = getTemplateById(state.editorDesignId) || {};
    openTemplateModal({
      ...sourceTemplate,
      id: state.editorDesignId || `preview-${Date.now()}`,
      title: state.editorTitle || 'My Custom Design',
      category: sourceTemplate.category || 'Custom Card',
      tags: sourceTemplate.tags || ['custom', 'card'],
      bg: JSON.parse(JSON.stringify(state.editorBg)),
      elements: JSON.parse(JSON.stringify(state.editorElements))
    });
  }

  // Toast Notification Manager
  function showToast(message) {
    const toastNode = document.createElement('div');
    toastNode.className = 'toast';
    toastNode.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span></span>
    `;
    // textContent: messages can contain server/user text (names, error messages)
    toastNode.querySelector('span').textContent = message;
    DOM.toastContainer.appendChild(toastNode);
    setTimeout(() => {
      toastNode.style.opacity = '0';
      toastNode.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => toastNode.remove(), 300);
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 9. EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Navigation Routing
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-category');
        const subcat = btn.getAttribute('data-subcategory');

        state.selectedCategory = cat;
        if (subcat) {
          state.searchQuery = subcat;
          DOM.searchInput.value = subcat;
          if (DOM.navbarSearchInput) {
            DOM.navbarSearchInput.value = subcat;
            if (DOM.navbarClearSearchBtn) {
              DOM.navbarClearSearchBtn.classList.toggle('hidden', !subcat);
            }
          }
        } else {
          state.searchQuery = '';
          DOM.searchInput.value = '';
          if (DOM.navbarSearchInput) {
            DOM.navbarSearchInput.value = '';
            if (DOM.navbarClearSearchBtn) {
              DOM.navbarClearSearchBtn.classList.add('hidden');
            }
          }
        }

        document.querySelectorAll('.nav-link, .chip').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-category') === cat);
        });
        switchView('explore');
      });
    });

    // Navbar search input events
    if (DOM.navbarSearchInput) {
      DOM.navbarSearchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        state.searchQuery = val;

        // Sync gallery input
        DOM.searchInput.value = val;

        // Toggle navbar clear btn
        if (DOM.navbarClearSearchBtn) {
          DOM.navbarClearSearchBtn.classList.toggle('hidden', !val);
        }

        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.classList.toggle('hidden', !val);
        }

        if (state.activeView !== 'explore') {
          switchView('explore');
        } else {
          renderGallery();
        }
      });
    }

    if (DOM.navbarClearSearchBtn) {
      DOM.navbarClearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        DOM.navbarSearchInput.value = '';
        DOM.searchInput.value = '';
        DOM.navbarClearSearchBtn.classList.add('hidden');
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.classList.add('hidden');
        }
        renderGallery();
      });
    }

    DOM.searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      state.searchQuery = val;
      if (DOM.navbarSearchInput) {
        DOM.navbarSearchInput.value = val;
        if (DOM.navbarClearSearchBtn) {
          DOM.navbarClearSearchBtn.classList.toggle('hidden', !val);
        }
      }
      renderGallery();
    });

    DOM.clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      DOM.searchInput.value = '';
      if (DOM.navbarSearchInput) {
        DOM.navbarSearchInput.value = '';
        if (DOM.navbarClearSearchBtn) {
          DOM.navbarClearSearchBtn.classList.add('hidden');
        }
      }
      renderGallery();
    });

    DOM.resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.filters = { occasion: 'All', style: 'All', color: 'All', orientation: 'All' };
      DOM.searchInput.value = '';
      if (DOM.navbarSearchInput) {
        DOM.navbarSearchInput.value = '';
        if (DOM.navbarClearSearchBtn) {
          DOM.navbarClearSearchBtn.classList.add('hidden');
        }
      }
      DOM.filterOccasion.value = 'All';
      DOM.filterStyle.value = 'All';
      DOM.filterColor.value = 'All';
      DOM.filterOrientation.value = 'All';
      document.querySelectorAll('.nav-link, .chip').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'All');
      });
      renderGallery();
    });

    [DOM.filterOccasion, DOM.filterStyle, DOM.filterColor, DOM.filterOrientation].forEach(sel => {
      sel.addEventListener('change', () => {
        state.filters.occasion = DOM.filterOccasion.value;
        state.filters.style = DOM.filterStyle.value;
        state.filters.color = DOM.filterColor.value;
        state.filters.orientation = DOM.filterOrientation.value;
        renderGallery();
      });
    });

    // Mobile Menu
    DOM.hamburgerBtn.addEventListener('click', () => {
      DOM.mobileMenu.classList.toggle('open');
    });

    // Header & Hero CTA Buttons
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
      });
    }

    const headerCreateBtn = document.getElementById('header-create-btn');
    if (headerCreateBtn) {
      headerCreateBtn.addEventListener('click', createBlankDesign);
    }

    const heroCreateBtn = document.getElementById('hero-create-btn');
    if (heroCreateBtn) {
      heroCreateBtn.addEventListener('click', createBlankDesign);
    }

    const heroExploreBtn = document.getElementById('hero-explore-btn');
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', () => {
        switchView('explore');
      });
    }

    // Top Header Distinct Navigation Links
    const headerNavGallery = document.getElementById('header-nav-gallery');
    if (headerNavGallery) {
      headerNavGallery.addEventListener('click', () => {
        switchView('explore');
      });
    }

    // Custom landing page category pill actions
    document.querySelectorAll('.wish-pill-btn, .reason-grid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-target-category');
        if (cat) {
          state.selectedCategory = cat;
          document.querySelectorAll('.nav-link, .chip').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-category') === cat);
          });
          switchView('explore');
        }
      });
    });

    // Upload your own in reasons section
    const reasonsUploadBtn = document.getElementById('reasons-upload-btn');
    if (reasonsUploadBtn) {
      reasonsUploadBtn.addEventListener('click', () => {
        createBlankDesign();
      });
    }

    // Scroll Listener for Hero Visual rotation/scaling
    window.addEventListener('scroll', () => {
      const heroBg = document.querySelector('.new-hero-visual-bg');
      if (heroBg) {
        if (window.scrollY > 50) {
          heroBg.classList.add('scrolled');
        } else {
          heroBg.classList.remove('scrolled');
        }
      }
    });

    const headerNavStudio = document.getElementById('header-nav-studio');
    if (headerNavStudio) {
      headerNavStudio.addEventListener('click', () => {
        createBlankDesign();
      });
    }

    const headerNavRsvp = document.getElementById('header-nav-rsvp');
    if (headerNavRsvp) {
      headerNavRsvp.addEventListener('click', () => switchView('rsvp'));
    }

    const headerNavDesigns = document.getElementById('header-nav-designs');
    if (headerNavDesigns) {
      headerNavDesigns.addEventListener('click', () => switchView('dashboard'));
    }

    // AI Card Assistant Modal Triggers
    const headerNavAi = document.getElementById('header-nav-ai');
    const aiModalOverlay = document.getElementById('ai-modal-overlay');
    const aiModalClose = document.getElementById('ai-modal-close');
    const aiCancelBtn = document.getElementById('ai-cancel-btn');
    const aiForm = document.getElementById('ai-card-form');

    if (headerNavAi && aiModalOverlay) {
      headerNavAi.addEventListener('click', () => {
        aiModalOverlay.classList.remove('hidden');
      });
    }

    if (aiModalClose && aiModalOverlay) {
      const closeAiModal = () => aiModalOverlay.classList.add('hidden');
      aiModalClose.addEventListener('click', closeAiModal);
    }

    if (aiForm) {
      aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventDetails = document.getElementById('magic-event-details').value.trim();
        const visualsDesc = document.getElementById('magic-visuals-desc') ? document.getElementById('magic-visuals-desc').value.trim() : '';
        const styleChoice = document.getElementById('magic-style-select') ? document.getElementById('magic-style-select').value : 'Best match';
        const colorChoice = document.getElementById('magic-color-select') ? document.getElementById('magic-color-select').value : 'Best match';

        // Intelligently match template by style & visual keywords
        let matchedTpl = null;
        const textLower = (eventDetails + ' ' + visualsDesc).toLowerCase();

        if (styleChoice !== 'Best match') {
          matchedTpl = state.templates.find(t => t.style.toLowerCase() === styleChoice.toLowerCase());
        }

        if (!matchedTpl && textLower.includes('floral')) {
          matchedTpl = state.templates.find(t => t.style === 'Floral');
        } else if (!matchedTpl && (textLower.includes('luxury') || textLower.includes('gold') || textLower.includes('black'))) {
          matchedTpl = state.templates.find(t => t.style === 'Luxury' || t.color === 'Black');
        } else if (!matchedTpl && textLower.includes('baby')) {
          matchedTpl = state.templates.find(t => t.category === 'Baby Shower');
        } else if (!matchedTpl && textLower.includes('wedding')) {
          matchedTpl = state.templates.find(t => t.category === 'Wedding');
        }

        if (!matchedTpl) matchedTpl = state.templates[0];

        // Clone template composition
        const magicTpl = JSON.parse(JSON.stringify(matchedTpl));
        magicTpl.title = `Magic Invite: ${eventDetails.split('\n')[0].substring(0, 30)}`;

        // Customize colors if requested
        if (colorChoice === 'Pink') {
          magicTpl.bg = { type: 'solid', value: '#FCECE4' };
        } else if (colorChoice === 'Purple') {
          magicTpl.bg = { type: 'gradient', color1: '#F4F0FC', color2: '#FFFFFF' };
        } else if (colorChoice === 'Black') {
          magicTpl.bg = { type: 'solid', value: '#1A1817' };
        } else if (colorChoice === 'Neutral') {
          magicTpl.bg = { type: 'solid', value: '#FAF8F5' };
        }

        // Apply event details to text layers
        const detailLines = eventDetails.split('\n').filter(l => l.trim().length > 0);
        let textIdx = 0;
        magicTpl.elements.forEach(el => {
          if (el.type === 'text') {
            if (detailLines[textIdx]) {
              el.content = detailLines[textIdx].toUpperCase();
            }
            textIdx++;
          }
        });

        if (aiModalOverlay) aiModalOverlay.classList.add('hidden');
        openEditorWithTemplate(magicTpl);
        showToast(`✨ Magic Invite created your custom design!`);
      });
    }

    const navDashboardBtn = document.getElementById('nav-dashboard-btn');
    if (navDashboardBtn) {
      navDashboardBtn.addEventListener('click', () => switchView('dashboard'));
    }
    const mobileDashboardBtn = document.getElementById('mobile-dashboard-btn');
    if (mobileDashboardBtn) {
      mobileDashboardBtn.addEventListener('click', () => {
        DOM.mobileMenu.classList.remove('open');
        switchView('dashboard');
      });
    }

    document.getElementById('nav-fav-btn').addEventListener('click', () => {
      switchView('dashboard');
      DOM.dashFavsContainer.classList.remove('hidden');
      DOM.dashDesignsContainer.classList.add('hidden');
      DOM.dashHeading.textContent = 'Favorites';
    });

    // Dashboard Tabs
    document.getElementById('dash-nav-designs').addEventListener('click', () => {
      DOM.dashDesignsContainer.classList.remove('hidden');
      DOM.dashFavsContainer.classList.add('hidden');
      DOM.dashHeading.textContent = 'My Designs';
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      document.getElementById('dash-nav-designs').classList.add('active');
    });

    document.getElementById('dash-nav-favs').addEventListener('click', () => {
      DOM.dashFavsContainer.classList.remove('hidden');
      DOM.dashDesignsContainer.classList.add('hidden');
      DOM.dashHeading.textContent = 'Favorites';
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      document.getElementById('dash-nav-favs').classList.add('active');
    });

    document.getElementById('dash-nav-rsvp').addEventListener('click', () => switchView('rsvp'));
    const mobileRsvpBtn = document.getElementById('mobile-rsvp-btn');
    if (mobileRsvpBtn) {
      mobileRsvpBtn.addEventListener('click', () => {
        DOM.mobileMenu.classList.remove('open');
        switchView('rsvp');
      });
    }

    document.getElementById('dash-nav-back').addEventListener('click', () => switchView('home'));
    document.getElementById('dash-create-btn').addEventListener('click', createBlankDesign);
    document.getElementById('empty-create-btn').addEventListener('click', createBlankDesign);

    // Quick View Modal Triggers
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.template-card');
      const useBtn = e.target.closest('.btn-use-template');
      const favBtn = e.target.closest('.btn-fav-card');

      if (favBtn) {
        e.stopPropagation();
        const id = favBtn.getAttribute('data-id');
        toggleFavorite(id, () => {
          renderGallery();
          renderTrending();
          renderFavoritesDashboard();
        });
        return;
      }

      if (useBtn) {
        e.stopPropagation();
        const id = useBtn.getAttribute('data-id');
        const tpl = getTemplateById(id);
        if (tpl) openEditorWithTemplate(tpl);
        return;
      }

      const interactiveCard = e.target.closest('.homepage-interactive-card');
      if (interactiveCard) {
        const id = interactiveCard.getAttribute('data-template-id');
        const tpl = getTemplateById(id);
        if (tpl) openEditorWithTemplate(tpl);
        return;
      }

      if (card && !e.target.closest('.btn-fav-card')) {
        const id = card.getAttribute('data-id');
        const tpl = getTemplateById(id);
        if (tpl) openTemplateModal(tpl);
      }
    });

    // Modal Close
    document.getElementById('template-modal-close').addEventListener('click', () => {
      DOM.templateModalOverlay.classList.add('hidden');
    });

    document.getElementById('modal-use-btn').addEventListener('click', () => {
      DOM.templateModalOverlay.classList.add('hidden');
      if (state.activeModalTemplate) openEditorWithTemplate(state.activeModalTemplate);
    });

    document.getElementById('modal-fav-btn').addEventListener('click', () => {
      if (state.activeModalTemplate) {
        const template = state.activeModalTemplate;
        toggleFavorite(template.id, () => {
          if (state.activeModalTemplate === template) {
            const isFav = state.favorites.includes(template.id);
            document.getElementById('modal-fav-text').textContent = isFav ? 'Remove Favorite' : 'Save to Favorites';
          }
          renderGallery();
          renderTrending();
          renderFavoritesDashboard();
        });
      }
    });

    // Editor Header Actions
    document.getElementById('editor-exit-btn').addEventListener('click', () => switchView('home'));
    document.getElementById('editor-save-btn').addEventListener('click', saveCurrentDesign);
    document.getElementById('editor-download-btn').addEventListener('click', exportCanvasToPng);
    document.getElementById('editor-3d-preview-btn').addEventListener('click', openCurrentEditorCardPreview);
    document.querySelectorAll('.card-surface-btn').forEach(button => {
      button.addEventListener('click', () => switchEditorSurface(button.dataset.surface));
    });
    document.getElementById('editor-next-btn').addEventListener('click', () => {
      persistActiveEditorSurface();
      const menu = document.getElementById('editor-next-menu');
      const isOpen = menu.classList.toggle('open');
      document.getElementById('editor-next-btn').setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.editor-next-option').forEach(option => {
      option.addEventListener('click', () => {
        document.getElementById('editor-next-menu').classList.remove('open');
        document.getElementById('editor-next-btn').setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (event) => {
      const menu = document.getElementById('editor-next-menu');
      if (menu && !menu.contains(event.target)) {
        menu.classList.remove('open');
        document.getElementById('editor-next-btn').setAttribute('aria-expanded', 'false');
      }
    });
    DOM.designCanvas.addEventListener('click', (event) => {
      if (event.target === DOM.designCanvas) {
        openCurrentEditorCardPreview();
      }
    });
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);

    DOM.editorProjectTitle.addEventListener('change', (e) => {
      state.editorTitle = e.target.value.trim() || 'My Custom Design';
      pushHistoryState();
    });

    // Zoom Controls
    document.getElementById('zoom-in-btn').addEventListener('click', () => {
      state.zoomLevel = Math.min(2, state.zoomLevel + 0.1);
      DOM.designCanvasWrapper.style.transform = `scale(${state.zoomLevel})`;
      DOM.zoomPercentText.textContent = `${Math.round(state.zoomLevel * 100)}%`;
    });

    document.getElementById('zoom-out-btn').addEventListener('click', () => {
      state.zoomLevel = Math.max(0.5, state.zoomLevel - 0.1);
      DOM.designCanvasWrapper.style.transform = `scale(${state.zoomLevel})`;
      DOM.zoomPercentText.textContent = `${Math.round(state.zoomLevel * 100)}%`;
    });

    document.getElementById('zoom-reset-btn').addEventListener('click', () => {
      state.zoomLevel = 1;
      DOM.designCanvasWrapper.style.transform = 'scale(1)';
      DOM.zoomPercentText.textContent = '100%';
    });

    // Editor Left Navigation Tabs
    document.querySelectorAll('.editor-nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        renderSubpanel(tab.getAttribute('data-tab'));
      });
    });

    // RSVP Guest Choices
    document.querySelectorAll('.rsvp-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-status');
        const guestNames = ['Alex Morgan', 'Jordan Lee', 'Taylor Swift', 'Sam Wilson', 'Chris Evans'];
        const name = guestNames[Math.floor(Math.random() * guestNames.length)];
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        state.rsvps.unshift({ name, status, time });
        localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(state.rsvps));
        renderRsvpStats();
        showToast(`RSVP submitted: ${status}`);
      });
    });

    document.getElementById('rsvp-back-btn').addEventListener('click', () => switchView('dashboard'));
    document.getElementById('create-invitation-trigger-btn').addEventListener('click', () => {
      DOM.invitationModalOverlay.classList.remove('hidden');
    });

    document.getElementById('invitation-modal-close').addEventListener('click', () => {
      DOM.invitationModalOverlay.classList.add('hidden');
    });

    document.getElementById('inv-cancel-btn').addEventListener('click', () => {
      DOM.invitationModalOverlay.classList.add('hidden');
    });

    document.getElementById('invitation-create-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inv-event-name').value;
      const date = document.getElementById('inv-date').value;
      const time = document.getElementById('inv-time').value;
      const location = document.getElementById('inv-location').value;
      const host = document.getElementById('inv-host').value;

      document.getElementById('event-display-name').textContent = name;
      document.getElementById('event-display-date').textContent = `Date: ${date}`;
      document.getElementById('event-display-time').textContent = `Time: ${time}`;
      document.getElementById('event-display-location').textContent = `Location: ${location}`;
      document.getElementById('event-display-host').textContent = `Hosted by: ${host}`;

      DOM.invitationModalOverlay.classList.add('hidden');
      showToast('New Invitation Event Created!');
    });

    // Share Modal
    document.getElementById('editor-share-btn').addEventListener('click', () => {
      DOM.shareModalOverlay.classList.remove('hidden');
    });

    document.getElementById('share-modal-close').addEventListener('click', () => {
      DOM.shareModalOverlay.classList.add('hidden');
    });

    document.getElementById('copy-share-btn').addEventListener('click', () => {
      const input = document.getElementById('share-link-input');
      input.select();
      document.execCommand('copy');
      DOM.shareModalOverlay.classList.add('hidden');
      showToast('Design link copied to clipboard!');
    });

    document.getElementById('send-email-btn').addEventListener('click', async () => {
      const sendButton = document.getElementById('send-email-btn');
      const sendButtonLabel = sendButton.querySelector('span');
      const name = document.getElementById('email-recipient-name').value.trim();
      const emailInput = document.getElementById('email-recipient-email').value.trim();
      const customMessage = document.getElementById('email-custom-message').value.trim();
      const cardUrl = document.getElementById('share-link-input').value.trim();

      if (!emailInput) {
        showToast('No email address is available for this card.');
        return;
      }

      const recipients = emailInput
        .split(/[;,]/)
        .map(email => email.trim())
        .filter(Boolean);
      const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!recipients.length || recipients.some(email => !isValidEmail(email))) {
        showToast('Please enter valid recipient email addresses.');
        return;
      }

      const greeting = name ? `Hi ${name},` : 'Hi,';
      const linkSection = cardUrl ? `\n\nYou can view it here:\n${cardUrl}` : '';
      const subject = `Check out ${state.editorTitle || 'this card'}`;
      const message = customMessage || 'I wanted to share this card with you.';
      const body = `${greeting}\n\n${message}${linkSection}`;

      sendButton.disabled = true;
      sendButtonLabel.textContent = 'Sending...';

      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: 'service_fz70vl9',
            template_id: 'template_0ty4njh',
            user_id: 'yFdSrc1GvjZm7sWd0',
            template_params: {
              to_email: recipients.join(', '),
              recipient_email: recipients.join(', '),
              email: recipients.join(', '),
              user_email: recipients.join(', '),
              recipient: recipients.join(', '),
              to: recipients.join(', '),
              to_name: name || 'Friend',
              name: name || 'Friend',
              subject,
              message: body,
              custom_message: message,
              card_url: cardUrl
            }
          })
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || `EmailJS request failed (${response.status})`);
        }

        DOM.shareModalOverlay.classList.add('hidden');
        showToast('Email sent successfully.');
      } catch (error) {
        console.error('Unable to send email:', error);
        showToast('The email could not be sent. Please try again.');
      } finally {
        sendButton.disabled = false;
        sendButtonLabel.textContent = 'Send Email';
      }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (state.activeView === 'editor') {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
          e.preventDefault();
          undo();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
          e.preventDefault();
          redo();
        } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          saveCurrentDesign();
        } else if (e.key === 'Delete' && state.selectedElementId) {
          deleteElementById(state.selectedElementId);
        }
      }
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('active');
      });
    });

    // Auth Modal & User Header Profile
    document.querySelectorAll('#nav-login-btn, [data-auth="login"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showAuthError('signin', '');
        showAuthError('signup', '');
        DOM.loginModalOverlay.classList.remove('hidden');
      });
    });

    DOM.loginModalClose.addEventListener('click', () => {
      DOM.loginModalOverlay.classList.add('hidden');
    });

    // Sliding Login / Signup UI Toggles
    const authWrapper = document.getElementById('auth-wrapper');

    document.querySelectorAll('.register-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (authWrapper) authWrapper.classList.add('toggled');
      });
    });

    document.querySelectorAll('.login-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (authWrapper) authWrapper.classList.remove('toggled');
      });
    });

    // Form Submits
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    if (signinForm) {
      signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;
        loginWithCredentials(email, password, document.getElementById('signin-submit-btn'));
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        registerAccount(name, email, password, document.getElementById('signup-submit-btn'));
      });
    }

    // Demo User Chips: real seeded accounts on the backend (server/src/services/demo.service.js)
    document.querySelectorAll('.demo-user-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        loginWithCredentials(chip.getAttribute('data-email'), DEMO_PASSWORD, chip);
      });
    });

    // Token expired or revoked (e.g. password changed elsewhere)
    window.addEventListener('petalwish:unauthorized', () => {
      if (!state.user) return;
      logoutUser({ silent: true });
      showToast('Your session has expired. Please log in again.');
    });

    // Avatar Dropdown Toggle
    DOM.userAvatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.userDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      if (DOM.userDropdownMenu) DOM.userDropdownMenu.classList.add('hidden');
    });

    // Dropdown Actions
    document.getElementById('dropdown-my-designs').addEventListener('click', () => {
      switchView('dashboard');
      DOM.dashDesignsContainer.classList.remove('hidden');
      DOM.dashFavsContainer.classList.add('hidden');
      DOM.dashHeading.textContent = 'My Designs';
      DOM.userDropdownMenu.classList.add('hidden');
    });

    document.getElementById('dropdown-favorites').addEventListener('click', () => {
      switchView('dashboard');
      DOM.dashFavsContainer.classList.remove('hidden');
      DOM.dashDesignsContainer.classList.add('hidden');
      DOM.dashHeading.textContent = 'Favorites';
      DOM.userDropdownMenu.classList.add('hidden');
    });

    document.getElementById('dropdown-rsvp').addEventListener('click', () => {
      switchView('rsvp');
      DOM.userDropdownMenu.classList.add('hidden');
    });

    document.getElementById('dropdown-logout').addEventListener('click', () => {
      logoutUser();
    });

    // Hero collage preview render
    document.querySelectorAll('.template-preview-render').forEach(el => {
      const tplId = el.getAttribute('data-template-id');
      const tpl = state.templates.find(t => t.id === tplId);
      if (tpl) {
        el.innerHTML = tpl.elements.slice(0, 4).map(e => `<div style="position:absolute;left:${e.x * 0.5}px;top:${e.y * 0.5}px;width:${e.width * 0.5}px;height:${e.height * 0.5}px;">${e.type === 'text' ? '<span style="font-size:12px;font-family:serif;">' + e.content + '</span>' : renderSvgElement(e)}</div>`).join('');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    updateUserAuthUI();
    renderGallery();
    renderTrending();
    setupEventListeners();
    window.addEventListener('resize', () => requestAnimationFrame(scaleCardThumbs));
    initTemplateLottieAnimations();

    // Render instantly with the built-in data, then refresh from the backend
    loadTemplatesFromApi().then(restoreSession);
  }

  function initTemplateLottieAnimations() {
    const containers = document.querySelectorAll('.template-lottie-layer');
    if (!containers.length) return;
    if (!window.lottie || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      containers.forEach(container => container.classList.add('lottie-fallback'));
      return;
    }

    const colors = [[1, .25, .48, 1], [.05, .75, .5, 1], [.49, .36, .98, 1], [1, .78, .18, 1], [1, 1, 1, 1]];
    const makeLayer = (index, alternate) => {
      const x = 35 + ((index * 83) % 530);
      const endX = x + (index % 2 ? 34 : -28);
      const size = 9 + (index % 4) * 4;
      const color = colors[(index + (alternate ? 2 : 0)) % colors.length];
      return {
        ddd: 0, ind: index + 1, ty: 4, nm: `confetti-${index}`, sr: 1,
        ks: {
          o: { a: 0, k: 88 },
          r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [360] }] },
          p: { a: 1, k: [{ t: 0, s: [x, -40 - index * 31, 0] }, { t: 90, s: [endX, 650 - index * 9, 0] }] },
          a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
        },
        ao: 0,
        shapes: [
          index % 3 === 0
            ? { ty: 'rc', d: 1, s: { a: 0, k: [size * 2.2, size * .65] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 3 }, nm: 'Ribbon' }
            : { ty: 'el', d: 1, s: { a: 0, k: [size, size] }, p: { a: 0, k: [0, 0] }, nm: 'Dot' },
          { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 }, r: 1, nm: 'Fill' }
        ],
        ip: 0, op: 90, st: 0, bm: 0
      };
    };

    containers.forEach((container, containerIndex) => {
      window.lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: {
          v: '5.12.2', fr: 30, ip: 0, op: 90, w: 600, h: 600, nm: 'PetalWish celebration', ddd: 0, assets: [],
          layers: Array.from({ length: 13 }, (_, index) => makeLayer(index, containerIndex % 2 === 1))
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();