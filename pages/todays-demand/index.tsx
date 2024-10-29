import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { option, tr } from "framer-motion/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faBars,
  faX,
  faXmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import SiteInfoTable from "@/components/siteinfo";
import ReadingTable from "@/components/readingtable";
const TodayDemandPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const PlantList = [
    {
      plant_id: 6011,
      plant_name: "AS_HUL_Doomdooma 1+2",
    },
    {
      plant_id: 6012,
      plant_name: "DNH_HUL_Amli",
    },
    {
      plant_id: 6013,
      plant_name: "UK_HUL_Haridwar",
    },
    {
      plant_id: 6014,
      plant_name: "GJ_UIEL_Kandla",
    },
    {
      plant_id: 6015,
      plant_name: "DNH_HUL_Dapada",
    },
    {
      plant_id: 6016,
      plant_name: "MP_HUL_Chhindwara",
    },
    {
      plant_id: 6017,
      plant_name: "MH_HUL_Chiplun",
    },
    {
      plant_id: 6018,
      plant_name: "PED_HUL_Pondicherry 2",
    },
    {
      plant_id: 6019,
      plant_name: "UP_HUL_SumerpurHUL",
    },
    {
      plant_id: 6020,
      plant_name: "UP_UIL_SumerpurUIL",
    },
  ];
  const tableData = [
    {profit: 45, loss:2},
    {profit: 65, loss:9},
    {profit: 99, loss:67},
    {profit: 34, loss:56},
    {profit: 56, loss:11},
    {profit: 78, loss:5},
  ]

  // site info table paramtets
  const energy: number = 56
  const power: number = 78
  const oil: number = 43
  const wood: number = 14
  const water: number = 96
  return (
    <DefaultLayout>
      <div className="w-full flex flex-col p-4 gap-8">
        
        {/* 1st div for modal and select */}
        <div className="flex gap-4 items-center bg-pink-200">
          <select className="bg-indigo-100 p-4 border rounded-md">
            {PlantList.map((item, idx) => (
              <option className="bg-white ">{item.plant_name}</option>
            ))}
          </select>
          <p
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-slate-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </p>
        </div>

        <Modal
          size="xl"
          backdrop="opaque"
          isOpen={isOpen}
          // onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Demo Instructructions
                </ModalHeader>
                <ModalBody>
                  <Tabs aria-label="Options">
                    <Tab key="NextJs" title="NextJs">
                      <Card>
                        <CardBody>
                          <ol type="I" style={{ listStyleType: 'upper-alpha' }} className="pl-6 pr-3">
                            <li>Next.js is a React framework for building full-stack web applications.</li>
                            <li>You use React Components to build user interfaces, and Next.js for additional features and optimizations.</li>
                            <li>A file-system based router built on top of Server Components that supports layouts, nested routing, loading states, error handling, and more.</li>
                            <li>Support for your preferred styling methods, including CSS Modules, Tailwind CSS, and CSS-in-JS</li>
                          </ol>
                         
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="Site Info" title="Site Info">
                     
                          <table className="border bg-slate-200 w-full table-auto">
                            <tr className="bg-slate-100 border border-gray-300">
                              <td className="px-3 py-2 font-semibold text-gray-600 border border-gray-300 text-center">Profit</td>
                              <td className="px-3 py-2 font-semibold text-gray-600 text-center">Loss</td>
                            </tr>
                            {tableData.map((item, idx) => (
                              <tr className="bg-white border" key={idx}>
                                <td className="text-center py-1 border">{item.profit}</td>
                                <td className="text-center py-1">{item.loss}</td>
                              </tr>
                            ))}
                          </table>
                        
                    </Tab>
                  </Tabs>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Close
                  </Button>
                  <Button color="primary" onClick={() => setIsOpen(!isOpen)}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* 2nd div for tabs and 2 table - redux part */}
        <Tabs>
          <Tab key='ReduxTable' title='ReduxTable'>
            <SiteInfoTable 
            energy = {energy}
            power = {power}
            oil = {oil}
            wood = {wood}
            water = {water}
            />
          </Tab>
          <Tab key='ReadingTable' title='ReadingTable'>
          <ReadingTable />
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default TodayDemandPage;
