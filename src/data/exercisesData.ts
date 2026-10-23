import { Exercise } from '../types';

export const EXERCISES_DATA: Exercise[] = [
  // CHEST
  {
    id: 'pushup-std',
    name: 'Standard Push-Up',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Set hands slightly wider than shoulder-width, fingers spread forward.',
      'Engage core and glutes so your body forms a straight line from heels to head.',
      'Lower your chest until it is about 2 inches from the floor, keeping elbows at a 45-degree angle.',
      'Push firmly through your whole palm back to the top without locking elbows sharply.'
    ],
    commonMistakes: [
      'Flaring elbows out at a 90-degree T-shape (causes shoulder impingement).',
      'Sagging the lower back or lifting hips like a tent.',
      'Craning the neck downward toward the floor.'
    ],
    alternatives: 'Knee Push-Ups or Incline Push-Ups against a study table/bed',
    safetyTip: 'Never rush. A slow 2-second descent builds 3x better joint stability.',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultWeightKg: 0,
  },
  {
    id: 'pushup-knee',
    name: 'Knee Push-Up (Beginner Progression)',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start on knees with hands slightly wider than shoulder-width.',
      'Maintain a straight line from knees through hips to shoulders.',
      'Lower chest smoothly toward the floor, pausing for a split second.',
      'Press through palms to return to starting position.'
    ],
    commonMistakes: [
      'Bending at the hips instead of lowering the entire chest.',
      'Placing hands too far ahead of shoulders.'
    ],
    alternatives: 'Wall Push-Ups or Incline Push-Ups',
    safetyTip: 'Use a towel or yoga mat under your knees for comfort.',
    defaultSets: 3,
    defaultReps: '10-15',
    defaultWeightKg: 0,
  },
  {
    id: 'db-bench-press',
    name: 'Dumbbell Flat Bench Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Front Delts'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Sit on the bench edge with dumbbells on your thighs, then lie back smoothly.',
      'Plant feet flat on the floor, squeeze shoulder blades together against the bench.',
      'Press dumbbells up directly above mid-chest without clinking them together at the top.',
      'Lower slowly until elbows reach bench level or slightly below with a comfortable stretch.'
    ],
    commonMistakes: [
      'Lifting feet off the floor (loses stability).',
      'Flaring elbows straight out wide (keep them tucked around 45 to 60 degrees).',
      'Bouncing dumbbells off the bottom.'
    ],
    alternatives: 'Floor Dumbbell Press or Push-ups',
    safetyTip: 'Pick weights you can control for 10 crisp reps with zero elbow shaking.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 10,
  },
  {
    id: 'db-incline-press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Upper Chest', 'Front Delts', 'Triceps'],
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Adjust bench to an incline between 30 and 45 degrees.',
      'Lie back with shoulder blades pinned and feet firmly on the ground.',
      'Press dumbbells upwards along a slight inward arc above upper chest.',
      'Control the descent for 2 full seconds until dumbbells are level with chest.'
    ],
    commonMistakes: [
      'Setting bench angle too high (>45 degrees shifts focus mostly to shoulders).',
      'Arching lower back excessively off the bench.'
    ],
    alternatives: 'Incline Push-ups with feet elevated on a sturdy chair',
    safetyTip: 'Always bring dumbbells to thighs first before sitting back up.',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultWeightKg: 8,
  },
  {
    id: 'barbell-bench-press',
    name: 'Flat Barbell Bench Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie with eyes directly under the racked bar. Feet planted, glutes on bench.',
      'Grip the bar slightly wider than shoulder width with a full secure grip.',
      'Unrack the bar and bring it directly over mid-chest with arms locked.',
      'Lower smoothly to touch lower chest lightly, then press forcefully back up.'
    ],
    commonMistakes: [
      'Bouncing the bar off ribs.',
      'Thumbless "suicide" grip (always wrap thumb securely around the bar).',
      'Lifting butt off the bench during the push.'
    ],
    alternatives: 'Dumbbell Flat Bench Press or Machine Chest Press',
    safetyTip: 'Never use collar clamps if you are benching alone without a spotter or safety bars.',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultWeightKg: 30,
  },
  {
    id: 'machine-chest-press',
    name: 'Seated Machine Chest Press',
    muscleGroup: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust seat height so handles align with middle/lower chest level.',
      'Sit back with head, upper back, and hips pressed firmly against backrest.',
      'Push handles forward in a controlled motion without fully hyperextending elbows.',
      'Return slowly to the start position, stopping just before weight plates touch.'
    ],
    commonMistakes: [
      'Setting seat too low so shoulders shrug upward.',
      'Letting the weight stack slam on the eccentric return.'
    ],
    alternatives: 'Dumbbell Flat Press or Push-ups',
    safetyTip: 'Ideal for beginners learning chest engagement without balancing weights.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 25,
  },

  // BACK
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown (Cable)',
    muscleGroup: 'Back',
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust thigh pad snugly over thighs so feet remain flat on the floor.',
      'Grip bar slightly wider than shoulder-width with palms facing away.',
      'Lean back very slightly (10-15 degrees) and draw your shoulder blades down.',
      'Pull bar smoothly down toward your upper chest, focusing on pulling with your elbows.'
    ],
    commonMistakes: [
      'Pulling the bar behind the neck (dangerous for rotator cuffs and cervical spine).',
      'Swinging upper body violently back and forth for momentum.',
      'Shrugging shoulders into ears at the top.'
    ],
    alternatives: 'Resistance Band Pulldown or Inverted Rows',
    safetyTip: 'Focus on elbows driving down into your back pockets.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 30,
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    muscleGroup: 'Back',
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Mid Traps'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Sit upright with knees slightly bent on foot plates.',
      'Grab V-bar handle with a neutral grip and sit tall with shoulders back.',
      'Pull handle into lower abdomen while driving elbows straight back.',
      'Pause for 1 second squeezing shoulder blades together, then release forward under control.'
    ],
    commonMistakes: [
      'Rounding the lower back like a cat when reaching forward.',
      'Rocking back and forth using momentum from hips.'
    ],
    alternatives: 'Single-Arm Dumbbell Row or Resistance Band Row',
    safetyTip: 'Keep your chest proud and spine neutral throughout all repetitions.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 25,
  },
  {
    id: 'db-single-arm-row',
    name: 'Dumbbell Single-Arm Row',
    muscleGroup: 'Back',
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Core'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Place left knee and left hand on a bench with flat back parallel to floor.',
      'Hold dumbbell in right hand, arm hanging straight down.',
      'Pull dumbbell up toward your hip pocket, keeping elbow close to your ribcage.',
      'Lower smoothly back down until you feel a gentle stretch in your lat.'
    ],
    commonMistakes: [
      'Twisting torso aggressively to yank weight up.',
      'Pulling straight up into armpit rather than back toward hip.'
    ],
    alternatives: 'Chest-Supported Dumbbell Row or Resistance Band Row',
    safetyTip: 'Keep neck in line with spine; look at bench edge rather than mirror.',
    defaultSets: 3,
    defaultReps: '10-12 each',
    defaultWeightKg: 10,
  },
  {
    id: 'db-rdl',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    muscleGroup: 'Back',
    secondaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand tall with feet hip-width apart, holding dumbbells against front of thighs.',
      'Unlock knees with a soft 15-degree bend and push your hips straight backward.',
      'Hinge forward from hips, sliding dumbbells down along shins until hamstrings stretch.',
      'Drive hips forward and squeeze glutes to return to standing.'
    ],
    commonMistakes: [
      'Squatting down with knees instead of hinging back at hips.',
      'Rounding the spine or letting dumbbells drift away from shins.',
      'Hyperextending spine backward at the top.'
    ],
    alternatives: 'Bodyweight Good Mornings or Glute Bridges',
    safetyTip: 'Imagine shutting a car door behind you with your hips.',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultWeightKg: 12,
  },
  {
    id: 'pullup-assisted',
    name: 'Pull-Up / Assisted Pull-Up',
    muscleGroup: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: [
      'Grip pull-up bar slightly wider than shoulders with overhand grip.',
      'Start from a dead hang with core engaged and shoulders packed down.',
      'Drive elbows down and back, pulling chest toward the bar.',
      'Lower under complete control for 2-3 seconds back to dead hang.'
    ],
    commonMistakes: [
      'Kicking legs or flailing body violently (kipping).',
      'Only doing partial half-reps without full range of motion.'
    ],
    alternatives: 'Lat Pulldowns or Resistance Band Assisted Pull-ups',
    safetyTip: 'If you cannot do 1 full pull-up, do 5-second slow eccentric negatives.',
    defaultSets: 3,
    defaultReps: '4-8',
    defaultWeightKg: 0,
  },

  // LEGS
  {
    id: 'bodyweight-squat',
    name: 'Bodyweight Air Squat',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Glutes', 'Core', 'Calves'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart, toes turned outward 15-30 degrees.',
      'Extend arms forward for balance and keep chest proud.',
      'Initiate by pushing hips back and bending knees tracking over toes.',
      'Descend until thighs are parallel to ground (or as deep as comfort allows).',
      'Push through mid-foot and heel to return to standing.'
    ],
    commonMistakes: [
      'Knees caving inward (keep pushing knees out in line with toes).',
      'Heels lifting off the ground (poor ankle mobility).',
      'Rounding upper torso forward.'
    ],
    alternatives: 'Box Squat (sitting back onto a chair) for beginners',
    safetyTip: 'If heels lift, place a book or thin plate under your heels.',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultWeightKg: 0,
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat (Dumbbell)',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Quads', 'Glutes', 'Core', 'Upper Back'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Hold one dumbbell vertically against your sternum with both hands cupping the top head.',
      'Stand with feet shoulder-width apart, toes pointed slightly outward.',
      'Squat down between your hips, letting elbows trace inside your knees.',
      'Pause for a beat at the bottom, then stand up driving through your whole foot.'
    ],
    commonMistakes: [
      'Letting the dumbbell pull your chest forward.',
      'Collapsing knees inward on the way up.'
    ],
    alternatives: 'Bodyweight Air Squat or Chair Squat',
    safetyTip: 'The goblet position automatically teaches perfect upright posture.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 8,
  },
  {
    id: 'db-walking-lunges',
    name: 'Walking Dumbbell Lunges',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Quads', 'Glutes', 'Hamstrings', 'Balance'],
    equipment: 'Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Hold dumbbells by sides with neutral grip, standing tall.',
      'Step forward with right foot, lowering back knee until it hovers 1 inch above floor.',
      'Keep front knee stacked directly over ankle, torso upright.',
      'Push through front heel to step forward directly into next stride.'
    ],
    commonMistakes: [
      'Banging back knee hard into the floor.',
      'Front knee shooting far past toes with heel lifting.',
      'Torso tipping forward.'
    ],
    alternatives: 'Static Split Squats without weights or Reverse Lunges',
    safetyTip: 'Take deliberate, medium-sized steps to maintain balance.',
    defaultSets: 3,
    defaultReps: '10-12 steps',
    defaultWeightKg: 6,
  },
  {
    id: 'leg-press-machine',
    name: '45-Degree Leg Press',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Quads', 'Glutes', 'Hamstrings'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Sit comfortably in leg press machine with lower back firmly pressed into pad.',
      'Place feet shoulder-width apart in middle of platform, toes angled out slightly.',
      'Release safety bar and lower platform smoothly until knees are bent to ~90 degrees.',
      'Press through feet to return to start, stopping just short of knee lockout.'
    ],
    commonMistakes: [
      'Locking knees hard at the top (hyperextension risk).',
      'Letting lower back curl off the seat at bottom (strains lumbar spine).',
      'Placing feet too low causing severe knee strain.'
    ],
    alternatives: 'Goblet Squat or Bodyweight Squat',
    safetyTip: 'Never allow your lower back or tailbone to lift off the padded backrest.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 50,
  },
  {
    id: 'glute-bridge',
    name: 'Floor Glute Bridge',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie on your back with knees bent and feet flat on floor hip-width apart.',
      'Arms by your sides with palms down.',
      'Drive through your heels to lift hips upward until knees, hips, and shoulders form a diagonal line.',
      'Squeeze glutes hard at the top for 2 seconds, then lower slowly.'
    ],
    commonMistakes: [
      'Over-arching lower back instead of squeezing glutes.',
      'Pushing through toes instead of heels.'
    ],
    alternatives: 'Single-leg Glute Bridge or Dumbbell Hip Thrust',
    safetyTip: 'Great for reversing hours of sitting in college lectures or office desks.',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultWeightKg: 0,
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Calf Raises',
    muscleGroup: 'Legs',
    secondaryMuscles: ['Calves', 'Ankles'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand near a wall or rail for light balance with balls of feet on a raised edge or flat floor.',
      'Rise up onto tiptoes as high as possible, squeezing calves for 1 full second.',
      'Lower down slowly below the edge for a full calf stretch.'
    ],
    commonMistakes: [
      'Bouncing rapidly using Achilles tendon elasticity instead of muscle work.',
      'Bending knees during the calf lift.'
    ],
    alternatives: 'Seated Calf Raise or Single-leg Calf Raise',
    safetyTip: 'Control the bottom stretch to protect the Achilles tendon.',
    defaultSets: 3,
    defaultReps: '15-20',
    defaultWeightKg: 0,
  },

  // SHOULDERS
  {
    id: 'db-overhead-press',
    name: 'Seated Dumbbell Overhead Shoulder Press',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Sit on an upright bench with back supported, holding dumbbells at shoulder level.',
      'Palms facing forward or slightly turned inward at 45 degrees.',
      'Press dumbbells smoothly straight up until arms are extended overhead.',
      'Lower slowly back to ear level over 2 full seconds.'
    ],
    commonMistakes: [
      'Flaring elbows straight back (tuck elbows 30 degrees forward in scapular plane).',
      'Arching lower back heavily off backrest.',
      'Clanking dumbbells together at the top.'
    ],
    alternatives: 'Standing Arnold Press or Resistance Band Overhead Press',
    safetyTip: 'Press directly above crown of head, not out in front.',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultWeightKg: 8,
  },
  {
    id: 'db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Side Delts', 'Traps'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand tall holding light dumbbells at sides, with a very slight forward torso lean.',
      'With elbows softly unlocked, raise arms out to sides until parallel to floor.',
      'Lead with elbows and pinkies slightly elevated, like pouring water from a pitcher.',
      'Control the descent for 2 seconds; do not let dumbbells drop freely.'
    ],
    commonMistakes: [
      'Using heavy weights and swinging hips/torso to launch weights.',
      'Shrugging traps up into ears.',
      'Raising hands higher than elbows.'
    ],
    alternatives: 'Cable Lateral Raise or Water Bottle Raises',
    safetyTip: 'Side delts are small muscles. Light weight (2kg-5kg) with strict form wins.',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultWeightKg: 4,
  },
  {
    id: 'face-pulls-cable',
    name: 'Face Pulls (Rope Cable)',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Rear Delts', 'Rotator Cuff', 'Upper Back'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Attach rope to cable pulley set at eye level.',
      'Grip rope ends with thumbs pointing backward toward you.',
      'Step back, pull rope directly toward bridge of your nose.',
      'Separate rope ends at finish while rotating hands backward (external rotation).',
      'Hold contraction for 1 second, then release slowly.'
    ],
    commonMistakes: [
      'Pulling down toward chin or chest instead of forehead/eyes.',
      'Leaning body backward to compensate for excess weight.'
    ],
    alternatives: 'Bent-Over Dumbbell Rear Delt Flyes or Band Pull-Aparts',
    safetyTip: 'The #1 exercise for bulletproofing student shoulders from slouching over laptops.',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultWeightKg: 15,
  },
  {
    id: 'db-front-raise',
    name: 'Dumbbell Front Raise',
    muscleGroup: 'Shoulders',
    secondaryMuscles: ['Front Delts', 'Upper Chest'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand holding dumbbells across front of thighs.',
      'Raise one dumbbell or both forward until arm is parallel to floor.',
      'Pause momentarily, then lower back to thighs with control.'
    ],
    commonMistakes: [
      'Swinging backward from lower back.',
      'Raising hands above shoulder level.'
    ],
    alternatives: 'Push-ups or Dumbbell Shoulder Press',
    safetyTip: 'Keep core tight to prevent spine extension.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 5,
  },

  // ARMS (BICEPS & TRICEPS)
  {
    id: 'db-bicep-curl',
    name: 'Standing Dumbbell Bicep Curl',
    muscleGroup: 'Arms',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width, holding dumbbells at sides with palms forward.',
      'Keep elbows pinned securely against your ribs.',
      'Curl dumbbells up toward shoulders, contracting biceps at the peak.',
      'Lower slowly under control for 2 full seconds.'
    ],
    commonMistakes: [
      'Swinging hips or elbows forward to cheat the weight up.',
      'Letting weights drop instantly on the negative.'
    ],
    alternatives: 'Resistance Band Curls or Backpack Curls with books',
    safetyTip: 'Lock your elbows into your side; only the forearms should move.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 7.5,
  },
  {
    id: 'db-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    muscleGroup: 'Arms',
    secondaryMuscles: ['Brachialis', 'Forearms'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Hold dumbbells with palms facing each other (neutral grip).',
      'Keep upper arms stationary and curl weights up toward front delts.',
      'Squeeze biceps and forearms at the top, then lower with control.'
    ],
    commonMistakes: [
      'Rocking shoulders back.',
      'Separating elbows from torso.'
    ],
    alternatives: 'Rope Cable Curls or Reverse Grip Curls',
    safetyTip: 'Great for building forearm grip strength and thicker arm appearance.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 8,
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    muscleGroup: 'Arms',
    secondaryMuscles: ['Triceps (Lateral & Medial heads)'],
    equipment: 'Cable/Machine',
    difficulty: 'beginner',
    instructions: [
      'Attach rope to high cable. Grasp rope and tuck elbows to sides with slight forward hip hinge.',
      'Push rope down toward floor, extending elbows fully.',
      'At bottom, flare rope ends apart and squeeze triceps for 1 second.',
      'Return hands to chest level keeping elbows pinned in place.'
    ],
    commonMistakes: [
      'Allowing elbows to drift forward and backward.',
      'Using shoulder momentum to press downward.'
    ],
    alternatives: 'Dumbbell Overhead Tricep Extension or Chair Dips',
    safetyTip: 'Elbows act as hinges; keep upper arms completely still.',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultWeightKg: 15,
  },
  {
    id: 'db-overhead-tricep-ext',
    name: 'Seated Overhead Dumbbell Tricep Extension',
    muscleGroup: 'Arms',
    secondaryMuscles: ['Triceps (Long head)'],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Sit tall holding one dumbbell vertically with both hands cupped under top plate.',
      'Lift dumbbell overhead with arms straight.',
      'Bending only at elbows, lower dumbbell behind head until forearms hit biceps.',
      'Press dumbbell back up to full extension squeezing triceps.'
    ],
    commonMistakes: [
      'Flaring elbows out excessively wide.',
      'Hitting back of head or neck with weight.'
    ],
    alternatives: 'Diamond Push-ups or Tricep Rope Pushdown',
    safetyTip: 'Keep elbows tucked relatively close to ears.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 10,
  },
  {
    id: 'bench-dips',
    name: 'Bench / Chair Dips',
    muscleGroup: 'Arms',
    secondaryMuscles: ['Triceps', 'Front Shoulders', 'Chest'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Sit on edge of a sturdy bench or chair, placing hands next to hips fingers forward.',
      'Slide hips off edge with legs bent at 90 degrees (or straight out for higher difficulty).',
      'Lower hips by bending elbows until upper arms are parallel to floor (not beyond).',
      'Press firmly through palms to push back up to straight arms.'
    ],
    commonMistakes: [
      'Dipping too deep below 90 degrees (strains anterior shoulder capsule).',
      'Shrugging shoulders into ears.'
    ],
    alternatives: 'Tricep Pushdowns or Knee Push-ups',
    safetyTip: 'Keep your back close to the bench as you descend.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 0,
  },

  // CORE & ABS
  {
    id: 'plank-std',
    name: 'Forearm Plank',
    muscleGroup: 'Core',
    secondaryMuscles: ['Transverse Abdominis', 'Glutes', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Rest on forearms with elbows directly under shoulders, legs extended back.',
      'Squeeze glutes, pull belly button in toward spine, and keep legs rigid.',
      'Hold neutral spine line: ears, shoulders, hips, and ankles aligned.',
      'Breathe steadily into your belly; do not hold your breath.'
    ],
    commonMistakes: [
      'Letting lower back sag toward floor (causes lumbar compression).',
      'Piking hips up toward ceiling like a mountain.',
      'Holding breath until dizzy.'
    ],
    alternatives: 'Knee Plank or Incline Plank on bench',
    safetyTip: 'Quality over duration: a rock-solid 30s plank beats a sagging 2-minute plank.',
    defaultSets: 3,
    defaultReps: '30-45 sec',
    defaultWeightKg: 0,
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    muscleGroup: 'Core',
    secondaryMuscles: ['Hip Flexors', 'Coordination'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Lie flat on back with arms pointing straight up to ceiling, knees bent at 90 degrees over hips.',
      'Press lower back flat against floor with zero gap.',
      'Slowly lower right arm and left leg toward floor simultaneously while keeping back pressed down.',
      'Return to center, then repeat with left arm and right leg.'
    ],
    commonMistakes: [
      'Letting lower back arch off the floor as limbs extend.',
      'Moving too fast without core tension.'
    ],
    alternatives: 'Bird Dog or Glute Bridge',
    safetyTip: 'The holy grail core exercise for spine safety and lower back pain prevention.',
    defaultSets: 3,
    defaultReps: '10 each side',
    defaultWeightKg: 0,
  },
  {
    id: 'hanging-knee-raise',
    name: 'Captain’s Chair / Hanging Knee Raise',
    muscleGroup: 'Core',
    secondaryMuscles: ['Lower Abs', 'Hip Flexors'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Support yourself on captain’s chair pads with forearms flat and back resting against pad.',
      'Keep chest tall and shoulders packed down.',
      'Curl knees smoothly up toward chest, rounding pelvis slightly at top to engage abs.',
      'Lower legs back down slowly without swinging.'
    ],
    commonMistakes: [
      'Swinging legs with momentum like a pendulum.',
      'Only lifting thighs without tilting pelvis (works only hip flexors, not abs).'
    ],
    alternatives: 'Lying Reverse Crunch or Dead Bug',
    safetyTip: 'Pause for 1 count at the top to eliminate momentum.',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultWeightKg: 0,
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    muscleGroup: 'Core',
    secondaryMuscles: ['Lower Back', 'Glutes', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start on hands and knees (tabletop position) with hands under shoulders, knees under hips.',
      'Extend right arm straight forward and left leg straight back until parallel to floor.',
      'Keep hips level without rotating pelvis.',
      'Hold for 2 seconds, return smoothly to tabletop, and switch sides.'
    ],
    commonMistakes: [
      'Arching spine excessively when lifting leg.',
      'Tilting hips sideways.'
    ],
    alternatives: 'Plank or Dead Bug',
    safetyTip: 'Great warmup move before squats and deadlifts.',
    defaultSets: 3,
    defaultReps: '8-10 each side',
    defaultWeightKg: 0,
  },

  // FULL BODY / CONDITIONING
  {
    id: 'burpees-no-pushup',
    name: 'Step-Back Burpee (Low Impact)',
    muscleGroup: 'Full Body',
    secondaryMuscles: ['Quads', 'Core', 'Cardio', 'Chest'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand tall, then squat down and place hands on floor in front of feet.',
      'Step feet back one by one into a solid plank position.',
      'Step feet forward back toward hands into squat stance.',
      'Stand up tall reaching hands overhead (or add a gentle hop).'
    ],
    commonMistakes: [
      'Slamming knees or arching back when jumping back.',
      'Landing heavily on balls of feet.'
    ],
    alternatives: 'Incline Burpee on bench or Mountain Climbers',
    safetyTip: 'Keep steps smooth; avoid jarring jumps if training in a hostel room.',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultWeightKg: 0,
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    muscleGroup: 'Full Body',
    secondaryMuscles: ['Core', 'Shoulders', 'Cardio'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in a strong high plank with hands directly beneath shoulders.',
      'Drive right knee forward toward chest without hips shooting up.',
      'Tap foot or switch smoothly to drive left knee forward.',
      'Maintain an even rhythm while keeping core locked tight.'
    ],
    commonMistakes: [
      'Bouncing hips high in the air.',
      'Shoulders drifting behind wrists.'
    ],
    alternatives: 'High Knees or Plank hold',
    safetyTip: 'Pace yourself: consistent rhythm over erratic sprint.',
    defaultSets: 3,
    defaultReps: '30-40 sec',
    defaultWeightKg: 0,
  }
];
