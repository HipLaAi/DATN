import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "../component/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../component/ui/card"
import { useEffect, useState } from "react";
import { getActivityUserAPI, getNewUserAPI, getUserGrowthRateAPI } from "../services/User/user.service";
import { useOutletContext } from "react-router-dom";
import { Flex } from "antd";

export function UserCards() {
    const { dataUser } = useOutletContext<{ dataUser: any }>();
    const [newUser, setNewUser] = useState<any>();
    const [newUserGrowthRate, setNewUserGrowthRate] = useState<any>();
    const [userGrowthRate, setUserGrowthRate] = useState<any>();
    const [activityUser, setGetActivityUser] = useState<any>();

    const fetchNewUser = async (month: any) => {
        try {
            const response = await getNewUserAPI(month);
            const results = await getUserGrowthRateAPI(month);
            setNewUser(response);
            setNewUserGrowthRate(results);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    const fetchUserGrowthRate = async (month: any) => {
        try {
            const response = await getUserGrowthRateAPI(month);
            setUserGrowthRate(response);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    const fetchActivityUserAPI = async () => {
        try {
            const response = await getActivityUserAPI();
            setGetActivityUser(response);
        } catch (error) {
            console.error("Failed:", error);
        }
    };


    useEffect(() => {
        fetchNewUser(1);
        fetchUserGrowthRate(3);
        fetchActivityUserAPI();
    }, []);

    return (
        <Flex vertical gap={10}
            style={{
                height: "80vh",
                overflowY: "auto",
            }}
        >
            {/* Tổng người dùng */}
            <Card className="@container/card rounded-xl">
                <CardHeader className="relative">
                    <CardDescription>Tổng số lượng người dùng</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {dataUser?.length}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        {
                            userGrowthRate?.growth > 0 ? (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3 text-green-500" />
                                    +{userGrowthRate?.growth}%
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingDownIcon className="size-3 text-red-500" />
                                    -{userGrowthRate?.growth}%
                                </Badge>
                            )
                        }
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    {
                        userGrowthRate?.growth > 0 ? (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tăng <TrendingUpIcon className="size-4 text-green-500" />+{userGrowthRate?.growth}%
                            </div>
                        ) : (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Giảm <TrendingDownIcon className="size-4 text-red-500" />-{userGrowthRate?.growth}%
                            </div>
                        )
                    }
                    <div className="text-muted-foreground">
                        Người dùng trong 3 tháng gần nhất
                    </div>
                </CardFooter>
            </Card>

            {/* Người dùng mới */}
            <Card className="@container/card rounded-xl">
                <CardHeader className="relative">
                    <CardDescription>Người dùng mới</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {newUser?.count}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        {
                            newUserGrowthRate?.growth > 0 ? (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3 text-green-500" />
                                    +{newUserGrowthRate?.growth}%
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingDownIcon className="size-3 text-red-500" />
                                    -{newUserGrowthRate?.growth}%
                                </Badge>
                            )
                        }
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    {
                        newUserGrowthRate?.growth > 0 ? (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tăng <TrendingUpIcon className="size-4 text-green-500" />+{newUserGrowthRate?.growth}%
                            </div>
                        ) : (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Giảm <TrendingDownIcon className="size-4 text-red-500" />-{newUserGrowthRate?.growth}%
                            </div>
                        )
                    }
                    <div className="text-muted-foreground">
                        Người dùng mới trong 1 tháng gần nhất
                    </div>
                </CardFooter>
            </Card>

            {/* Người dùng còn hoạt động */}
            <Card className="@container/card rounded-xl">
                <CardHeader className="relative">
                    <CardDescription>Người dùng hoạt động</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {activityUser?.count}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        {
                            activityUser?.count > 0 ? (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3 text-green-500" />
                                    +{activityUser?.count}
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingDownIcon className="size-3 text-red-500" />
                                    -{activityUser?.count}
                                </Badge>
                            )
                        }
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    {
                        activityUser?.count > 0 ? (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tăng <TrendingUpIcon className="size-4 text-green-500" />+{activityUser?.count}
                            </div>
                        ) : (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Giảm <TrendingDownIcon className="size-4 text-red-500" />-{activityUser?.count}
                            </div>
                        )
                    }
                    <div className="text-muted-foreground">
                        Tổng người dùng còn hoạt động
                    </div>
                </CardFooter>
            </Card>

            {/* Tỷ lệ người dùng */}
            <Card className="@container/card rounded-xl">
                <CardHeader className="relative">
                    <CardDescription>Tỷ lệ người dùng</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {userGrowthRate?.growth}%
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        {
                            userGrowthRate?.growth > 0 ? (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3 text-green-500" />
                                    +{userGrowthRate?.growth}%
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingDownIcon className="size-3 text-red-500" />
                                    -{userGrowthRate?.growth}%
                                </Badge>
                            )
                        }
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    {
                        userGrowthRate?.growth > 0 ? (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tăng <TrendingUpIcon className="size-4 text-green-500" />+{userGrowthRate?.growth}%
                            </div>
                        ) : (
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Giảm <TrendingDownIcon className="size-4 text-red-500" />-{userGrowthRate?.growth}%
                            </div>
                        )
                    }
                    <div className="text-muted-foreground">
                        Tổng người dùng trong vòng 3 tháng
                    </div>
                </CardFooter>
            </Card>
        </Flex>
    )
}

