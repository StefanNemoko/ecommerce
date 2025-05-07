'use client'

import {useEffect, useMemo, useState} from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	TransitionChild,
} from '@headlessui/react'
import {
	Bars3Icon,
	BellIcon,
	CalendarIcon,
	ChartPieIcon,
	Cog6ToothIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	XMarkIcon,
	UserIcon,
	CubeIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Link, usePage} from "@inertiajs/react";
import {route} from 'ziggy-js';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const AuthenticatedLayout = ({children, auth}) => {
	// local state
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [currentUrl, setCurrentUrl] = useState(window.location.href);

	const [navigation, setNavigation] = useState([]);

	const [userNavigation, setUserNavigation] = useState([
		{name: 'Your profile', href: '#'},
		{name: 'Sign out', href: '#'},
	]);

	// unfortunately, adding window.location.href as a dependency does not work
	// Therefor I added an eventListener that listens to popstate changes
	useEffect(() => {
		// Update the URL when the location changes
		const handleLocationChange = () => {
			setCurrentUrl(window.location.href);
		};

		// Listen for popstate events (for browser back/forward button, etc.)
		window.addEventListener('popstate', handleLocationChange);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('popstate', handleLocationChange);
		};


	}, []);

	useEffect(() => {
		// Load in navigation and keep track of currentUrl to update current state
		setNavigation([
			{
				name: 'Dashboard',
				href: route('backend.dashboard'),
				icon: HomeIcon,
				current: currentUrl.includes(route('backend.dashboard'))
			},
			{
				name: 'Products',
				href: route('backend.products'),
				icon: CubeIcon,
				current: currentUrl.includes(route('backend.products'))
			},
			{name: 'Projects', href: '#', icon: FolderIcon, current: '#' === currentUrl},
			{name: 'Calendar', href: '#', icon: CalendarIcon, current: '#' === currentUrl},
			{name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: '#' === currentUrl},
			{name: 'Reports', href: '#', icon: ChartPieIcon, current: '#' === currentUrl},
		]);
	}, [currentUrl]);

	const renderNavigation = useMemo(() => {
		return (
			<div className={'flex-1 grow-1'}>
				{navigation?.map((item) => {
					return (
						<li key={item.name}>
							<Link
								href={item.href}
								className={classNames(
									item.current
										? 'bg-indigo-700 text-white'
										: 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
									'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
								)}
								onClick={() => setCurrentUrl(item.href)}
							>
								<item.icon
									aria-hidden="true"
									className={classNames(
										item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
										'size-6 shrink-0',
									)}
								/>
								{item.name}
							</Link>
						</li>
					);
				})}
			</div>
		);
	}, [navigation]);


	return (
		<div className={'flex flex-1 flex-col min-h-screen'}>
			<Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
				/>

				<div className="fixed inset-0 flex">
					<DialogPanel
						transition
						className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
					>
						<TransitionChild>
							<div
								className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
								<button type="button" onClick={() => setSidebarOpen(false)}
										className="-m-2.5 p-2.5">
									<span className="sr-only">Close sidebar</span>
									<XMarkIcon aria-hidden="true" className="size-6 text-white"/>
								</button>
							</div>
						</TransitionChild>
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
							<div className="flex h-16 shrink-0 items-center">
								<img
									alt="Your Company"
									src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
									className="h-8 w-auto"
								/>
							</div>
							<nav className="flex flex-1 flex-col">
								<ul role="list" className="flex flex-1 flex-col gap-y-7">
									<li>
										<ul role="list" className="-mx-2 space-y-1">
											{renderNavigation}
										</ul>
									</li>
									<li className="mt-auto">
										<Link
											href="#"
											className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
										>
											<Cog6ToothIcon
												aria-hidden="true"
												className="size-6 shrink-0 text-indigo-200 group-hover:text-white"
											/>
											Settings
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
					<div className="flex h-16 shrink-0 items-center">
						<img
							alt="Your Company"
							src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
							className="h-8 w-auto"
						/>
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{renderNavigation}
								</ul>
							</li>
							<li className="mt-auto">
								<Link
									href="#"
									className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
								>
									<Cog6ToothIcon
										aria-hidden="true"
										className="size-6 shrink-0 text-indigo-200 group-hover:text-white"
									/>
									Settings
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className="lg:pl-72 flex flex-1 flex-col">
				<div
					className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
					<button type="button" onClick={() => setSidebarOpen(true)}
							className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
						<span className="sr-only">Open sidebar</span>
						<Bars3Icon aria-hidden="true" className="size-6"/>
					</button>

					{/* Separator */}
					<div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden"/>

					<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
						<form action="#" method="GET" className="grid flex-1 grid-cols-1">
							<input
								name="search"
								type="search"
								placeholder="Search"
								aria-label="Search"
								className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
							/>
							<MagnifyingGlassIcon
								aria-hidden="true"
								className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
							/>
						</form>
						<div className="flex items-center gap-x-4 lg:gap-x-6">
							<button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
								<span className="sr-only">View notifications</span>
								<BellIcon aria-hidden="true" className="size-6"/>
							</button>

							{/* Separator */}
							<div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"/>

							{/* Profile dropdown */}
							<Menu as="div" className="relative">
								<MenuButton className="-m-1.5 flex items-center p-1.5">
									<span className="sr-only">Open user menu</span>
									<UserIcon className="size-10 rounded-full bg-gray-100 p-1.5"/>
									<span className="hidden lg:flex lg:items-center">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                        {auth.user.name}
                      </span>
                      <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400"/>
                    </span>
								</MenuButton>
								<MenuItems
									transition
									className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
								>
									{userNavigation.map((item) => (
										<MenuItem key={item.name}>
											<Link
												href={item.href}
												className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
											>
												{item.name}
											</Link>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>

				<main className="py-10 flex flex-col flex-1">
					<div className="px-4 sm:px-8 lg:px-12 md:10 flex flex-1 flex-col">{children}</div>
				</main>
			</div>
		</div>
	);
}

export default AuthenticatedLayout;
