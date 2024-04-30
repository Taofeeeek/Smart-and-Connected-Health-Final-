def minFallingPathSum(grid) -> int:
    def dfs(row: int, col: int) -> int:
        if row == N:
            return 0
        if col < 0 or col == N:
            return float('inf')
        res = grid[row][col] + min(
            dfs(row + 1,  col - 1),
            dfs(row + 1, col),
            dfs(row + 1, col + 1)
        )
        return res


    N = len(grid)
    res = float('inf')
    for c in range(0, N):
        res = min(res, dfs(0, c))

    return res
    
    
grid = [[1,2,3],[4,5,6],[7,8,9]]
print(minFallingPathSum(grid))