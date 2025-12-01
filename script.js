document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const defaultConfig = {
    app_title: "ManThor Booster App",
    hero_title: "Exclusive Smart Tracking",
    age_label: "Age",
    weight_label: "Weight (kg)",
    height_label: "Height (cm)",
    goal_label: "Goal",
    button_text: "Calculate Ideal Routine",
    card_1_title: "Daily Reminders",
    card_2_title: "Diet Suggestions",
    // card_3_title removed
    card_4_title: "Buy Treatment 3-6 Months (VIP)",
    background_color: "#0a0a0a",
    primary_color: "#dc2626",
    accent_color: "#f97316",
    text_color: "#ffffff",
    secondary_color: "#d1d5db"
  };

  async function onConfigChange(config) {
    document.getElementById('app-title').textContent = config.app_title || defaultConfig.app_title;
    document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
    document.getElementById('age-label').textContent = config.age_label || defaultConfig.age_label;
    document.getElementById('weight-label').textContent = config.weight_label || defaultConfig.weight_label;
    document.getElementById('height-label').textContent = config.height_label || defaultConfig.height_label;
    document.getElementById('goal-label').textContent = config.goal_label || defaultConfig.goal_label;
    document.getElementById('submit-button').textContent = config.button_text || defaultConfig.button_text;
    document.getElementById('card-1-title').textContent = config.card_1_title || defaultConfig.card_1_title;
    document.getElementById('card-2-title').textContent = config.card_2_title || defaultConfig.card_2_title;
    document.getElementById('card-4-title').textContent = config.card_4_title || defaultConfig.card_4_title;

    const backgroundColor = config.background_color || defaultConfig.background_color;
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const secondaryColor = config.secondary_color || defaultConfig.secondary_color;

    document.body.style.background = `linear-gradient(180deg, ${backgroundColor} 0%, #1a1a1a 50%, ${backgroundColor} 100%)`;
    const appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.style.background = `linear-gradient(180deg, ${backgroundColor} 0%, #1a1a1a 50%, ${backgroundColor} 100%)`;
    
    document.querySelectorAll('.input-group input, .input-group select').forEach(el => {
      el.style.borderColor = primaryColor;
      el.style.color = textColor;
    });

    document.querySelectorAll('.input-group label').forEach(el => {
      el.style.color = accentColor;
    });

    const hero = document.querySelector('.hero-title');
    if (hero) hero.style.color = secondaryColor;

    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.borderColor = primaryColor;
    });

    document.querySelectorAll('.card-title').forEach(title => {
      title.style.color = accentColor;
    });

    const button = document.querySelector('.primary-button');
    if (button) {
      button.style.background = `linear-gradient(135deg, ${primaryColor} 0%, #b91c1c 100%)`;
      button.style.borderColor = accentColor;
    }
  }

  function mapToCapabilities(config) {
    return {
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          }
        },
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.config.primary_color = value;
              window.elementSdk.setConfig({ primary_color: value });
            }
          }
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.config.accent_color = value;
              window.elementSdk.setConfig({ accent_color: value });
            }
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          }
        },
        {
          get: () => config.secondary_color || defaultConfig.secondary_color,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.config.secondary_color = value;
              window.elementSdk.setConfig({ secondary_color: value });
            }
          }
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    };
  }

  function mapToEditPanelValues(config) {
    return new Map([
      ["app_title", config.app_title || defaultConfig.app_title],
      ["hero_title", config.hero_title || defaultConfig.hero_title],
      ["age_label", config.age_label || defaultConfig.age_label],
      ["weight_label", config.weight_label || defaultConfig.weight_label],
      ["height_label", config.height_label || defaultConfig.height_label],
      ["goal_label", config.goal_label || defaultConfig.goal_label],
      ["button_text", config.button_text || defaultConfig.button_text],
      ["card_1_title", config.card_1_title || defaultConfig.card_1_title],
      ["card_2_title", config.card_2_title || defaultConfig.card_2_title],
      ["card_4_title", config.card_4_title || defaultConfig.card_4_title]
    ]);
  }

  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues
    });
  }

  // Função para calcular rotina personalizada
  function calculateRoutine(age, weight, height, goal) {
    const bmi = weight / ((height / 100) ** 2);
    let routine = '';

    if (goal === 'performance') {
      routine = `
        <strong>🎯 Goal: Performance & Libido</strong><br>
        <strong>Your Profile:</strong> Age ${age}y, Weight ${weight}kg, Height ${height}cm, BMI ${bmi.toFixed(1)}<br><br>
        <strong>📋 Recommendation:</strong> Maximum enhancement for sexual performance, virile energy and endurance.<br>
        <strong>💊 ManThor Supplementation:</strong>
        <ul style="margin:6px 0;padding-left:20px;">
          <li><strong>ManThor</strong> (Libido Supplement): <strong>20 drops sublingual</strong></li>
          <li><strong>Ideal timing:</strong> 30-45 minutes before intimate moments</li>
          <li><strong>Frequency:</strong> As needed (up to 2x per day)</li>
          <li><strong>How to use:</strong> Apply under the tongue and hold for 30 seconds before swallowing</li>
        </ul>
        <strong>⚡ Optimized Performance Routine:</strong>
        <ul style="margin:6px 0;padding-left:20px;">
          <li><strong>Nutrition:</strong> Eat protein-rich and zinc-rich foods (seafood, eggs, nuts)</li>
          <li><strong>Training:</strong> Anaerobic training 3-4x/week to potentialize effects</li>
          <li><strong>Hydration:</strong> Maintain 3-4L of water per day</li>
          <li><strong>Sleep:</strong> Sleep 7-8h for hormonal recovery</li>
          <li><strong>Scheduling:</strong> Go to Daily Reminders to schedule reminders</li>
        </ul>
        <strong>📊 Expected Results:</strong> Immediate libido increase (15-30 min after application), virile energy, enhanced sexual performance and elevated confidence.
      `;
    } else if (goal === 'vitality') {
      routine = `
        <strong>🎯 Goal: Vitality & Well-being</strong><br>
        <strong>Your Profile:</strong> Age ${age}y, Weight ${weight}kg, Height ${height}cm, BMI ${bmi.toFixed(1)}<br><br>
        <strong>📋 Recommendation:</strong> Balanced routine for overall health, constant vitality and integral well-being.<br>
        <strong>💊 ManThor Supplementation:</strong>
        <ul style="margin:6px 0;padding-left:20px;">
          <li><strong>ManThor</strong> (Vitality): <strong>20 drops sublingual</strong></li>
          <li><strong>Ideal timing:</strong> Morning (7-8am) with breakfast</li>
          <li><strong>Frequency:</strong> Daily for cumulative effect</li>
          <li><strong>How to use:</strong> Apply under the tongue and hold for 30 seconds before swallowing</li>
        </ul>
        <strong>⚡ Healthy Vitality Routine:</strong>
        <ul style="margin:6px 0;padding-left:20px;">
          <li><strong>Morning:</strong> ManThor 20 drops + Complete breakfast (eggs, oatmeal, fruits)</li>
          <li><strong>Afternoon:</strong> 30-45 min of walking, strength training or yoga</li>
          <li><strong>Evening:</strong> Light meal, 2h before bedtime</li>
          <li><strong>Sleep:</strong> 7-8h per night for recovery</li>
          <li><strong>Hydration:</strong> 3-4L of water throughout the day</li>
          <li><strong>Scheduling:</strong> Use Daily Reminders to not forget morning dosage</li>
        </ul>
        <strong>📊 Benefits:</strong> Constant energy, improved mood, elevated physical and mental resistance, enhanced libido, better quality of life.
      `;
    }

    return routine;
  }

  // Generate a simple diet suggestion based on chosen goal and basic profile
  function generateDiet(age, weight, height, goal) {
    // lightweight heuristic "AI" to choose a diet template
    if (goal === 'performance') {
      return `
        <h3 style="color:#f97316;margin-top:0;">Personalized Diet — Performance</h3>
        <p>Goal: Muscle gain & sexual performance optimization.</p>
        <ul style="margin:6px 0 12px 20px;">
          <li><strong>Breakfast:</strong> High-protein (eggs, oats, fruit)</li>
          <li><strong>Mid-morning:</strong> Fruit + nuts or Greek yogurt</li>
          <li><strong>Lunch:</strong> Lean protein (chicken/salmon), brown rice, veggies</li>
          <li><strong>Pre-workout:</strong> Banana + peanut butter or small carb</li>
          <li><strong>Post-workout:</strong> Protein shake + quick carbs (fruit/maltodextrin)</li>
          <li><strong>Dinner:</strong> Light protein + vegetables</li>
        </ul>
        <p><strong>Notes:</strong> Emphasize zinc and healthy fats (oysters, eggs, nuts), stay hydrated (3-4L/day), and distribute protein across meals.</p>
      `;
    }

    // default: vitality
    return `
      <h3 style="color:#f97316;margin-top:0;">Personalized Diet — Vitality</h3>
      <p>Goal: Daily vitality, steady energy and well-being.</p>
      <ul style="margin:6px 0 12px 20px;">
        <li><strong>Breakfast:</strong> Balanced (oatmeal, fruit, Greek yogurt)</li>
        <li><strong>Mid-morning:</strong> Light snack (apple + nuts)</li>
        <li><strong>Lunch:</strong> Balanced protein + complex carbs + greens</li>
        <li><strong>Afternoon:</strong> Movement (30-45 min walk) + light snack</li>
        <li><strong>Dinner:</strong> Lighter meal, focus on vegetables and lean protein</li>
      </ul>
      <p><strong>Notes:</strong> Daily dosing of ManThor in the morning, consistent sleep and hydration (3-4L/day) improve cumulative benefits.</p>
    `;
  }

  const calculatorForm = document.getElementById('calculator-form');
  if (calculatorForm) {
    calculatorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const age = parseInt(document.getElementById('age').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const goal = document.getElementById('goal').value;

      const button = document.getElementById('submit-button');
      const originalText = button ? button.textContent : '';
      if (button) {
        button.textContent = 'Processing...';
        button.style.opacity = '0.8';
      }

      // simulate processing delay
      setTimeout(() => {
        if (button) {
          button.textContent = '✅ Routine Calculated!';
          button.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
        }

        setTimeout(() => {
          if (button) {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
            button.style.opacity = '1';
          }

          // Compute routine and pre-generate a diet suggestion (but do NOT navigate automatically)
          const routine = calculateRoutine(age, weight, height, goal);
          const dietHtml = (typeof generateDiet === 'function') ? generateDiet(age, weight, height, goal) : '';

          // persist last result for dieta.html (save only the calculated routine; diets are stored separately)
          const payload = { timestamp: Date.now(), inputs: { age, weight, height, goal }, routineHtml: routine };
          try { localStorage.setItem('manthor_last_result', JSON.stringify(payload)); } catch (err) { console.warn('localStorage save failed', err); }

          // show inline routine only; instruct user to open Diet Suggestions card to view merged diets
          const resultSection = document.getElementById('result-section');
          const resultContent = document.getElementById('result-content');
          if (resultSection && resultContent) {
            resultContent.innerHTML = routine + '<hr style="margin:12px 0;">' +
              '<div style="margin-top:8px;color:#d1d5db;font-size:13px;">You can open a separate diet suggestion page:</div>' +
              '<div style="margin-top:10px;"><a href="dieta.html" id="open-diet-link" style="color:#f97316;text-decoration:none;font-weight:700;border:1px solid #f97316;padding:8px 12px;border-radius:8px;">Open Diet Suggestions</a></div>';
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }

        }, 900);
      }, 900);
    });
  }

  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-5px)';
      }, 150);
    });
  });

  // Checkout links handling for Buy Treatment (3/6/9 months)
  // Default checkout links (fall back if localStorage not set). Update when you provide URLs.
  const defaultCheckoutLinks = {
    '1': 'https://rad-supply.mycartpanda.com/checkout/202808132:1', // 1-month link provided by user
    '3': 'https://rad-supply.mycartpanda.com/ckt/Ygo8yR', // 3-month link
    '6': 'https://rad-supply.mycartpanda.com/ckt/8wQMWR', // 6-month link
    '9': 'https://rad-supply.mycartpanda.com/ckt/wx8LmD' // 9-month link
  };
  function applyCheckoutLinks() {
    try {
      const raw = localStorage.getItem('manthor_checkout_links');
      const links = raw ? JSON.parse(raw) : defaultCheckoutLinks;
      [['1','buy-1-btn'], ['3','buy-3-btn'], ['6','buy-6-btn'], ['9','buy-9-btn']].forEach(([months,id]) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const url = links[months] || '#';
        btn.dataset.url = url;
        btn.onclick = (e) => {
          if (!url || url === '#') {
            e.preventDefault();
            return;
          }
          window.location.href = url;
        };
      });
    } catch (e) { console.warn('applyCheckoutLinks failed', e); }
  }

  // Expose helper to set checkout links from console or programmatically
  window.setCheckoutLinks = function(linksObj) {
    try {
      if (!linksObj || typeof linksObj !== 'object') throw new Error('Provide object like {"3":"url","6":"url","9":"url"}');
      localStorage.setItem('manthor_checkout_links', JSON.stringify(linksObj));
      applyCheckoutLinks();
      return true;
    } catch (e) { console.warn('setCheckoutLinks failed', e); return false; }
  };

  // apply at startup
  applyCheckoutLinks();

  // Try to show product image if asset exists; hide if missing
  (function checkProductImage(){
    const img = document.getElementById('product-img');
    if (!img) return;
    fetch(img.src, { method: 'HEAD' }).then(resp => {
      if (resp && resp.ok) {
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    }).catch(() => { img.style.display = 'none'; });
  })();

  // Thor/Viking Dynamic Effects
  console.log('Thor effects script loaded');
  const bgEffects = document.getElementById('bg-effects');
  
  if (bgEffects) {
    console.log('bg-effects found, starting effects');
    
    // Create dynamic lightning bolts
    function createLightningBolt() {
      const bolt = document.createElement('div');
      bolt.style.position = 'absolute';
      bolt.style.width = '4px';
      bolt.style.height = '150px';
      bolt.style.left = Math.random() * 100 + '%';
      bolt.style.top = Math.random() * 60 + '%';
      bolt.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
      bolt.style.background = 'linear-gradient(180deg, #87CEEB 0%, #1E90FF 50%, transparent 100%)';
      bolt.style.boxShadow = '0 0 20px #87CEEB, 0 0 40px #1E90FF';
      bolt.style.opacity = '0';
      bolt.style.transition = 'opacity 0.05s';
      bolt.style.pointerEvents = 'none';
      bolt.style.zIndex = '5';
      
      bgEffects.appendChild(bolt);
      
      // Flash effect
      setTimeout(() => bolt.style.opacity = '1', 10);
      setTimeout(() => bolt.style.opacity = '0.4', 80);
      setTimeout(() => bolt.style.opacity = '0.95', 120);
      setTimeout(() => bolt.style.opacity = '0', 180);
      setTimeout(() => bolt.remove(), 300);
    }
    
    // Create floating runes
    function createFloatingRune() {
      const runes = ['ᚦ', 'ᚢ', 'ᚱ', 'ᚺ', '⚡', '🪓', '🔨', 'ᛗ', 'ᚹ'];
      const rune = document.createElement('div');
      rune.textContent = runes[Math.floor(Math.random() * runes.length)];
      rune.style.position = 'absolute';
      rune.style.left = (Math.random() * 85 + 5) + '%';
      rune.style.top = (Math.random() * 75 + 10) + '%';
      rune.style.fontSize = (Math.random() * 25 + 50) + 'px';
      rune.style.color = 'rgba(220, 38, 38, 0.7)';
      rune.style.textShadow = '0 0 20px rgba(220, 38, 38, 1), 0 0 40px rgba(220, 38, 38, 0.8)';
      rune.style.pointerEvents = 'none';
      rune.style.zIndex = '5';
      rune.style.fontWeight = 'bold';
      rune.style.animation = 'float-dynamic 8s ease-in-out infinite';
      
      bgEffects.appendChild(rune);
      setTimeout(() => rune.remove(), 8000);
    }
    
    // Start effects immediately
    createLightningBolt();
    createFloatingRune();
    
    // Lightning every 2 seconds
    setInterval(() => {
      createLightningBolt();
      setTimeout(() => createLightningBolt(), 100);
    }, 2000);
    
    // Runes every 3 seconds
    setInterval(() => {
      createFloatingRune();
    }, 3000);
    
    console.log('Effects initialized successfully');
  } else {
    console.error('bg-effects element not found!');
  }

});