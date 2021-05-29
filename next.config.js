module.exports = {
  images: {
    domains: ["res.cloudinary.com", "links.papareact.com", "fakestoreapi.com"],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    firebase_config_api_key: process.env.FIREBASE_CONFIG_API_KEY,
    firebase_authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_projectId: process.env.FIREBASE_PROJECT_ID,
    firebase_storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebase_messagingSenderId: process.env.FIREBASE_MESSAGEING_SENDER_ID,
    firebase_appId: process.env.FIREBASE_APP_ID,
    firebase_permissions_type: process.env.FIREBASE_PERMISSIONS_TYPE,
    firebase_permissions_project_id: process.env.FIREBASE_PERMSISSIONS_PROJECT_ID,
    firebase_permissions_key_id: process.env.FIREBASE_PERMSISSIONS_KEY_ID,
    firebase_permissions_private_key: process.env.FIREBASE_PERMSISSIONS_PRIVATE_KEY,
    firebase_permissions_client_email: process.env.FIREBASE_PERMSISSIONS_CLIENT_EMAIL,
    firebase_permissions_client_id: process.env.FIREBASE_PERMSISSIONS_CLIENT_ID,
    firebase_permissions_client_x509_cert_url: process.env.FIREBASE_PERMSISSIONS_CLIENT_CERT_URL,
  },
};
