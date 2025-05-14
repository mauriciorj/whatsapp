"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const UserProfileTable = ({
  isLoading,
  isUserProfileDataLoading,
  mutation,
  setIsLoading,
  translations,
  userProfileData,
}: {
  isLoading: boolean;
  isUserProfileDataLoading: boolean;
  mutation: any;
  setIsLoading: (param: boolean) => void;
  translations: any;
  userProfileData: any;
}) => {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {translations["firstName"]["label"]}
            </TableCell>
            <TableCell>
              {isUserProfileDataLoading ? (
                <Skeleton className="w-full h-6 w-32" />
              ) : (
                userProfileData?.first_name
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              {translations["lastName"]["label"]}
            </TableCell>
            <TableCell>
              {isUserProfileDataLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                userProfileData?.last_name
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              {translations["email"]["label"]}
            </TableCell>
            <TableCell>
              {isUserProfileDataLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                userProfileData?.email
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              {translations["plan"]["label"]}
            </TableCell>
            <TableCell>
              {isUserProfileDataLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                userProfileData?.plan
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-6">
        <Button
          onClick={() => {
            if (userProfileData?.email) {
              setIsLoading(true);
              mutation.mutate();
            }
          }}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? (
            <div className="flex flex-row items-center italic">
              {translations["submitLoadingLabel"]}
              <LoaderCircle className="animate-spin h-6 w-5 ml-2" />
            </div>
          ) : (
            translations["submitLabel"]
          )}
        </Button>
      </div>
    </>
  );
};

export default UserProfileTable;
