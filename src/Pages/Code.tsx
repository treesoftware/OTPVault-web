import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { useClipboard, useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import { Button, IconButton } from "@chakra-ui/button";
import { Divider, Heading, Stack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import React, { useCallback, useState } from "react";
import { useRouteMatch } from "react-router";
import { ApiFetchOtp } from "../Api/Otp";
import { useMutation, useQuery } from 'react-query';
import { decryptString } from "../Util/decryptString";
import { SectionBox } from "../Components/SectionBox";
import { SectionField } from "../Components/SectionField";
import dayjs from "dayjs";
import { GrClose } from 'react-icons/gr';
import { SingleOTPCode } from "../Components/SingleOTPCode";
import { Link } from "react-router-dom";
import { ErrorPage } from "./Error";
import { LoadingPage } from "./Loading";
import { EditOtpModal } from "../Components/Modals/EditOtp";
import { DeleteOtpModal } from "../Components/Modals/DeleteOtp";
import { CreateOtpFieldModal } from "../Components/Modals/CreateOtpField";
import { ApiDeleteOtpField } from "../Api/OtpField";
import { UpdateOtpFieldModal } from "../Components/Modals/UpdateOtpField";
import { OtpField } from "../@types/OtpField";

interface SingleCodeProps { }
interface RouteParams {
    id: string;
}
export const SingleCode: React.FC<SingleCodeProps> = () => {

    const match = useRouteMatch<RouteParams>();
    const borderColor = useColorModeValue("gray.200", "gray.900");
    const issuerColor = useColorModeValue("gray.400", "gray.700");
    const closeColor = useColorModeValue("black", "white");
    const editModal = useDisclosure();
    const deleteModal = useDisclosure();
    const newFieldModal = useDisclosure();

    const [updateField, setUpdateField] = useState<{ isOpen: boolean; field?: OtpField }>({ isOpen: false });

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery(["single-password", match.params.id], () => ApiFetchOtp(match.params.id), {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
    });

    const deleteOtpField = useMutation(
        "delete-field", 
        (id: number) => ApiDeleteOtpField(match.params.id, id),
        {
            onSuccess() {
                toast({
                    title: "Field Deleted",
                    description: "The field has been deleted successfully",
                    status: "success",
                    duration: 2500,
                    isClosable: true
                })
            },
            onError(error: any) {
                toast({
                    title: "An Error Occured",
                    description: error.msg,
                    status: "error",
                    duration: 2500,
                })
            }
        }
    );

    const copyCode = useClipboard("");

    const toast = useToast();
    const onCopyValue = useCallback(async (val: string) => {

        copyCode.value = val;
        copyCode.onCopy();

        toast({
            title: "Value Copied",
            description: "The value has been copied to your clipboard",
            status: "success",
            duration: 2500,
            isClosable: true
        });


    }, [copyCode, toast]);

    if (isLoading || !data || isError) {
        return (
            <GridItem
                p={5}
                borderLeftColor={borderColor}
                borderLeftWidth={1}
            >
                {
                    isLoading || (!data && !isError) ? <LoadingPage /> : <ErrorPage message={(error as any).msg} />
                }
            </GridItem>
        )
    }

    return (
        <GridItem
            p={5}
            borderLeftColor={borderColor}
            borderLeftWidth={1}
            h="full"
            overflow="auto"
        >
            <Flex justifyContent="space-between" mb={5}>

                <Stack maxW="80%">
                    {
                        data.issuer &&
                        <Heading
                            color={issuerColor}
                            size="xs"
                            textTransform="uppercase"
                            fontWeight="bold"
                            mb={2}
                            isTruncated
                        >{decryptString(data.issuer)}</Heading>
                    }
                    <Heading isTruncated size="lg">{decryptString(data.name)}</Heading>
                </Stack>
                <Box flexShrink={0}>
                    <IconButton
                        as={Link}
                        to="/codes"
                        aria-label="Close"
                        color={closeColor}
                        icon={<GrClose />}
                    />
                </Box>
            </Flex>

            <SingleOTPCode otp={data} />
            <Divider mt={2} />

            <Stack mt={10}>
                <SectionBox title="Fields">
                    {
                        data.fields && data.fields.length > 0 ?
                        
                            data.fields?.map(field => (
                                <Tooltip
                                    key={`otp-${match.params.id}-field-${field.id}`}
                                    label="Click to copy value"
                                >
                                    <SectionField
                                        onClick={() => onCopyValue(decryptString(field.value))}
                                        onDelete={() => deleteOtpField.mutate(field.id!)}
                                        onEdit={() => setUpdateField({ isOpen: true, field })}
                                        title={decryptString(field.name)}
                                        value={decryptString(field.value)}
                                    />
                                </Tooltip>
                            ))
                        :
                        <Button colorScheme="green" size="sm" onClick={newFieldModal.onOpen}>Create Field</Button>
                    }
                </SectionBox>
                <SectionBox title="Code settings">
                    <SectionField
                        title="Label"
                        value={decryptString(data.name)}
                    />
                    {
                        data.issuer &&
                        <SectionField
                            title="Issuer"
                            value={decryptString(data.issuer)}
                        />
                    }
                    <SectionField
                        title="Digits To Generate"
                        value={data.digits ? decryptString(data.digits) : "6"}
                    />
                    <SectionField
                        title="Generate Digits Every"
                        value={`${data.period ? decryptString(data.period) : "30"} seconds`}
                    />
                    <SectionField
                        title="Key Algorithm"
                        value={data.algorithm ? decryptString(data.algorithm) : "SHA1"}
                    />
                </SectionBox>

                <SectionBox title="Details">
                    <SectionField
                        title="Last modified"
                        value={dayjs(data.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                    />
                    <SectionField
                        title="Added"
                        value={dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    />
                </SectionBox>

                <Stack direction="row" justifyContent="end" bg={borderColor} p={3} borderRadius={5}>
                    <Button colorScheme="green" onClick={newFieldModal.onOpen}>New Field</Button>
                    <Button colorScheme="blue" onClick={editModal.onOpen}>Edit</Button>
                    <Button colorScheme="red" onClick={deleteModal.onOpen}>Delete</Button>
                </Stack>

            </Stack>


            <EditOtpModal
                otp={data}
                onClose={editModal.onClose}
                isOpen={editModal.isOpen}
            />
            <DeleteOtpModal
                id={data.id}
                isOpen={deleteModal.isOpen}
                onClose={deleteModal.onClose}
            />
            <CreateOtpFieldModal
                otpId={data.id}
                isOpen={newFieldModal.isOpen}
                onClose={newFieldModal.onClose}
            />
            {
                updateField.isOpen &&
                <UpdateOtpFieldModal
                    otpField={updateField.field!}
                    otpId={data.id}
                    isOpen={true}
                    onClose={() => {
                        setUpdateField({ isOpen: false });
                    }}
                />
            }
        </GridItem>
    )
}