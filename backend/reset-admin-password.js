const fs = require('fs-extra');
const bcrypt = require('bcrypt');

const USERS_FILE_PATH = './data/usuarios.json';
const ADMIN_EMAIL = 'admin@example.com';

const resetAdminPassword = async () => {
  try {
    const newPassword = process.argv[2];
    if (!newPassword) {
      console.error('❌ Por favor, proporciona una nueva contraseña.');
      console.log('Uso: node reset-admin-password.js <nueva_contraseña>');
      return;
    }

    const users = await fs.readJson(USERS_FILE_PATH);
    
    const adminIndex = users.findIndex(u => u.email === ADMIN_EMAIL);

    if (adminIndex === -1) {
      console.error(`❌ No se encontró al usuario administrador con el email: ${ADMIN_EMAIL}`);
      return;
    }

    console.log('🔄 Generando hash para la nueva contraseña...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    users[adminIndex].passwordHash = passwordHash;

    await fs.writeJson(USERS_FILE_PATH, users, { spaces: 2 });

    console.log(`✅ ¡Éxito! La contraseña para ${ADMIN_EMAIL} ha sido actualizada.`);

  } catch (error) {
    console.error('🔥 Ocurrió un error al reiniciar la contraseña:', error.message);
  }
};

resetAdminPassword();
