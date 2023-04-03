const { catchAsync } = require('../../utils');
const jimp = require('jimp');
const path = require('path');
const { updateUser } = require('../auth/update');
const fs = require('fs').promises;

exports.updateAvatar = catchAsync(async (req, res, next) => {
    if (!req.file) {
    return res.status(400).json({
    message: 'Please upload an image.',
    });
    }
    
    const avatar = await jimp.read(req.file.path);
    await avatar.cover(250, 250).write(`${req.file.destination}/${req.file.filename}`);
    
    const newAvatarFileName = `${req.user.id}-${Date.now()}-${path.basename(req.file.filename)}`;
    const newAvatarPath = `public/avatars/${newAvatarFileName}`;
    await fs.promises.rename(req.file.path, newAvatarPath);
    
    const avatarURL = `/avatars/${newAvatarFileName}`;
    
    await updateUser(req.user.id, {avatarURL: avatarURL});
    
    return res.status(200).json({ message: `avatarURL: ${avatarURL}` });
    });
    
    
    
    
    
    
