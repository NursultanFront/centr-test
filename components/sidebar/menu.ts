import RimIcon from '@/assets/images/svg/aside/rim.svg?component';
import UserIcon from '@/assets/images/svg/aside/user.svg?component';
import SettingsIcon from '@/assets/images/svg/aside/settings.svg?component';

export const userMenuItemList = [
  {
    icon: UserIcon,
    title: 'Profile',
    path: '/profile',
  },
  {
    icon: RimIcon,
    title: 'Vechicles',
    path: '/',
  },
  {
    icon: SettingsIcon,
    title: 'Setting',
    path: '/setting',
  },
];
