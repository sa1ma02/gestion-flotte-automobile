import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Button, Dialog as MuiDialog, DialogTitle, DialogContent } from "@mui/material";
import { navigation } from "../../../config/navigationMenu";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { getUser, logout } from "../../../Redux/Auth/Action";
import IMAGES from "../../../Images/index";
import AuthModal from "../Auth/AuthModal"; // Assurez-vous que ce chemin est correct

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false); // État pour le pop-up
  const [openAuthModal, setOpenAuthModal] = useState(false); // État pour le modal de connexion
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };
  
  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    if (!auth.user) {
      setOpenPopup(true); // Afficher le pop-up si l'utilisateur n'est pas connecté
    } else {
      navigate(`/${category.id}/${section.id}/${item.id}`);
      close();
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false); // Fermer le pop-up
  };

  useEffect(() => {
    if (auth.user) {
      handleCloseAuthModal();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{ backgroundColor: '#09ba3f' }}
        >
          Gestion efficace de la flotte automobile - Simplifiez la gestion et optimisez les performances
        </p>

        <nav aria-label="Top" className="mx-auto" style={{ marginBottom: '0', paddingBottom: '0' }}>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    src={IMAGES.imgTwo}
                    alt="OCP-LOGO"
                    style={{ height: '60px', width: '60px' }}
                  />
                </Link>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                            onClick={(e) => {
                                              if (item.href !== "/") {
                                                if (!auth.user) {
                                                  e.preventDefault();
                                                  setOpenPopup(true);
                                                }
                                              }
                                            }}
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700  rounded-md px-2 py-1"
                      style={{ backgroundColor: 'transparent' }} // Default background color
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(217, 217, 217)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onFocus={(e) => e.currentTarget.style.backgroundColor = 'rgb(217, 217, 217)'}
                    onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={(e) => {
                        if (page.href !== "/") {
                          if (!auth.user) {
                            e.preventDefault();
                            setOpenPopup(true);
                          }
                        }
                      }
                        
                    }
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName ? auth.user.firstName[0].toUpperCase() : "?"}
                      </Avatar>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpenAuthModal}
                      style={{ color: '#09ba3f' }}
                      className="text-sm font-medium hover:text-[#09ba3f]"
                    >
                      Se connecter
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MuiDialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Connexion Requise</DialogTitle>
        <DialogContent>
          Vous devez être connecté pour accéder à cette section.
        </DialogContent>
        <Button onClick={handleClosePopup} sx={{color:"#09ba3f"}}>
          OK
        </Button>
      </MuiDialog>

      <AuthModal handleClose={handleCloseAuthModal} open={openAuthModal} />
    </div>
  );
}
