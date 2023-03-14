import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x316C28cb0195D5D1153068e61447238c612E4C81');
    const { mutateAsync: createProject } = useContractWrite(contract, 'createProject');

    const address = useAddress();
    const connect = useMetamask();

    const publishProject = async (form) => {
        try {
            const data = await createProject([
                address, //address
                form.title, //title
                form.about, //about
                form.target,
                new Date(form.deadline).getTime(), //deadline,
                form.photos, //photos 
            ])

            console.log("contact call successfully", data)
        } catch (error) {
            console.log("contact call failed", error)
        }
    }

    const getProjects = async () => {
        const projects = await contract.call('getProjects');

        const parsedProjects = projects.map((project, i) => ({
            owner: project.owner,
            title: project.title,
            about: project.about,
            target: ethers.utils.formatEther(project.target.toString()),
            deadline: project.deadline.toNumber(),
            fundsCollected: ethers.utils.formatEther(project.fundsCollected.toString()),
            photos: project.photos,
            pId: i
        }));

        return parsedProjects;
    }

    const getUserProjects = async () => {
        const allProjects = await getProjects();

        const filteredProjects = allProjects.filter((project) =>
            project.owner === address);

        return filteredProjects;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToProject', pId, { value: ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; 1 < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createProject: publishProject,
                getProjects,
                getUserProjects,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);