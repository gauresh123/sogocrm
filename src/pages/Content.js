import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { validateDateTime } from "@mui/x-date-pickers/internals";
import { useEffect, useState } from "react";
import Iconify from "src/components/iconify/Iconify";
import useAuthContext from "src/context/AuthContext";
import { getContent, getTemplate } from "src/helpers/contentHelper";
import ContentTable from "src/sections/content/ContentTable";
import CreateContent from "src/sections/content/CreateContent";
import CreateTemplate from "src/sections/content/CreateTemplate";
import EditContent from "src/sections/content/EditContentPopup";
import EditTemplate from "src/sections/content/EditTemplatePopup";
import TemplateTable from "src/sections/content/TemplateTable";


const Content = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [openEditTemplate, setOpenEditTemplate] = useState(false);
    const [openEditContent, setOpenEditContent] = useState(false);
    const [openCreateContent, setOpenCreateContent] = useState(false);
    const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
    const [contentData, setContentData] = useState();
    const [templateData, setTemplateData] = useState();
    const [editContentData, setEditContentData] = useState(null);
    const [editTemplateData, setEditTemplateData] = useState(null);
    const [openDeleteContent, setOpenDeleteContent] = useState(false);
    const [openDeleteTemplate,setOpenDeleteTemplate]=useState(false);


    const { currentOrgId } = useAuthContext();


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        if (selectedTab == 0) {
            (async () => {
                const res = await getTemplate(currentOrgId);
                console.log(res?.data, "datasss")
                setTemplateData(res?.data)
            })
                ();
        }
        if (selectedTab == 1) {
            (async () => {
                const res = await getContent(currentOrgId);
                setContentData(res?.data)
            })
                ();
        }
    }, [selectedTab, openEditContent, openEditTemplate, openCreateContent, openCreateTemplate,openDeleteContent,openDeleteTemplate])

    const handleOpenEditContent = (val) => {
        setOpenEditContent(true);
        setEditContentData(val);
    }

    const handleOpenEditTemplate = (val) => {
        setOpenEditTemplate(true);
        setEditTemplateData(val);
    }

    return (
        <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Template" />
                <Tab label="Content" />
            </Tabs>
            {selectedTab === 0 && (
                <Box
                    sx={{ marginTop: 2 }}>
                    <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                        <Typography variant="h6" gutterBottom>Templates</Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} size="small"
                            onClick={() => setOpenCreateTemplate(true)}
                        >Create</Button>
                    </Box>
                    <TemplateTable openEditPopup={(val) => handleOpenEditTemplate(val)} data={templateData} openDeleteTemplate={openDeleteTemplate} setOpenDeleteTemplate={(val)=>setOpenDeleteTemplate(val)}/>
                </Box>
            )}

            {selectedTab === 1 && (
                <Box sx={{ marginTop: 2 }}>
                    <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                        <Typography variant="h6" gutterBottom>Content</Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} size="small" onClick={() => setOpenCreateContent(true)}>Create</Button>
                    </Box>

                    <ContentTable openEditPopup={(val) => handleOpenEditContent(val)} data={contentData} openDeleteContent={openDeleteContent} setOpenDeleteContent={(val) => setOpenDeleteContent(val)} />
                </Box>
            )}
            <EditTemplate open={openEditTemplate} data={editTemplateData} onClose={() => setOpenEditTemplate(false)} />
            <EditContent open={openEditContent} data={editContentData} onClose={() => setOpenEditContent(false)} />
            <CreateContent open={openCreateContent} onClose={() => setOpenCreateContent(false)} />
            <CreateTemplate open={openCreateTemplate} onClose={() => setOpenCreateTemplate(false)} />
        </Container>
    )
}


export default Content;  