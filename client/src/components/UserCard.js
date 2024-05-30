import React from 'react'
import Avtar from './Avtar.js';
import { Link } from 'react-router-dom';

const UserCard = ({user, onClose}) => {
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-500 hover:border hover:border-primary rounded cursor-pointer'>
      <div>
        <Avtar
        width={40}
        height={40}
        name={user?.name}
        usersId={user?._id}
        imageUrl={user?.profile}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div >
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserCard;